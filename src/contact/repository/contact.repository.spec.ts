import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities/contact.entity';
import { Phone } from '../entities/phone.entity';
import { Location } from '../entities/location.entity';
import { ContactRepository } from './contact.repository';

describe('ContactRepository', () => {
  let contactRepository: ContactRepository;
  let contactMockRepository: Repository<Contact>;
  let phoneMockRepository: Repository<Phone>;
  let locationMockRepository: Repository<Location>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ContactRepository,
        {
          provide: getRepositoryToken(Contact),
          useClass: jest.fn(() => ({
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          })),
        },
        {
          provide: getRepositoryToken(Phone),
          useClass: jest.fn(() => ({
            findOne: jest.fn(),
            save: jest.fn(),
          })),
        },
        {
          provide: getRepositoryToken(Location),
          useClass: jest.fn(() => ({
            findOne: jest.fn(),
            save: jest.fn(),
          })),
        },
      ],
    }).compile();

    contactRepository = moduleRef.get<ContactRepository>(ContactRepository);
    contactMockRepository = moduleRef.get<Repository<Contact>>(
      getRepositoryToken(Contact),
    );
    phoneMockRepository = moduleRef.get<Repository<Phone>>(
      getRepositoryToken(Phone),
    );
    locationMockRepository = moduleRef.get<Repository<Location>>(
      getRepositoryToken(Location),
    );
  });

  describe('save', () => {
    it('should throw an error if any repository throws an error', async () => {
      // Arrange
      const contact = new Contact();
      contact.name = 'John Doe';
      contact.email = 'jdoe@example.com';
      const phone1 = new Phone();
      phone1.number = '1234567890';
      const phone2 = new Phone();
      phone2.number = '0987654321';
      const location1 = new Location();
      location1.city = 'New York';
      const location2 = new Location();
      location2.city = 'San Francisco';

      jest
        .spyOn(contactMockRepository, 'save')
        .mockRejectedValueOnce(new Error('Some error'));
      const savePromise = contactRepository.save({
        ...contact,
        phone: [phone1, phone2],
        location: [location1, location2],
      });

      await expect(savePromise).rejects.toThrowError('Some error');
    });
  });

  describe('findByEmail', () => {
    it('should return a contact with the given email', async () => {
      // Arrange
      const email = 'jdoe@example.com';
      const expectedContact = new Contact();
      expectedContact.name = 'John Doe';
      expectedContact.email = email;
      jest
        .spyOn(contactMockRepository, 'findOne')
        .mockResolvedValueOnce(expectedContact);

      // Act
      const result = await contactRepository.findByEmail(email);

      // Assert
      expect(result).toEqual(expectedContact);
      expect(contactMockRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should throw an error if repository throws an error', async () => {
      // Arrange
      const email = 'jdoe@example.com';
      jest
        .spyOn(contactMockRepository, 'findOne')
        .mockRejectedValueOnce(new Error('Some error'));
      const findPromise = contactRepository.findByEmail(email);
      await expect(findPromise).rejects.toThrowError('Some error');
    });
  });
});
