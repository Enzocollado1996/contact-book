import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { Repository } from 'typeorm';
import { Phone } from '../entities/phone.entity';
import { Location } from '../entities/location.entity';

@Injectable()
export class ContactRepository {
  constructor(
    @InjectRepository(Contact)
    private readonly _contactRepository: Repository<Contact>,
    @InjectRepository(Phone)
    private readonly _phoneRepository: Repository<Phone>,
    @InjectRepository(Location)
    private readonly _locationRepository: Repository<Location>,
  ) {}

  public async save(contact) {
    try {
      const cont = await this._contactRepository.save(contact);
      contact.phone.map(async (element) => {
        element.contact = cont.id;
      });
      contact.location.map(async (element) => {
        element.contact = cont.id;
      });
      await await this._phoneRepository.save(contact.phone);
      await await this._locationRepository.save(contact.location);
      return cont.id;
    } catch (e) {
      throw new Error(e);
    }
  }
  public async findByEmail(email: string) {
    try {
      return this._contactRepository.findOne({
        where: { email },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findByPersonalData(name: string) {
    try {
      return this._contactRepository.findOne({
        where: { name },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findByPhone(phone: string) {
    try {
      const phoneContact = await this._phoneRepository.findOne({
        where: { number: phone },
        relations: {
          contact: true,
        },
      });
      return phoneContact;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findByCity(city: string) {
    try {
      const locationContact = await this._locationRepository.findOne({
        where: { city },
        relations: {
          contact: true,
        },
      });
      return locationContact;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async updatePersonalData(id: string, contact) {
    try {
      this._contactRepository.update(id, contact);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async deletePersonalData(id: string) {
    try {
      this._contactRepository.delete(id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
