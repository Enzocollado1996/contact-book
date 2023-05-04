import { Injectable } from '@nestjs/common';
import { ContactDTO } from './dto/contact.dto';
import { ContactRepository } from './repository/contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}
  async save(contactDTO: ContactDTO) {
    const id = await this.contactRepository.save(contactDTO);
    return { message: `Guardo con éxito id: ${id}` };
  }

  async findByEmail(email: string) {
    return await this.contactRepository.findByEmail(email);
  }

  async findByPersonalData(name: string) {
    return await this.contactRepository.findByPersonalData(name);
  }

  async findByPhone(phone: string) {
    return await this.contactRepository.findByPhone(phone);
  }

  async findByCity(city: string) {
    return await this.contactRepository.findByCity(city);
  }

  async updatePersonalData(id: string, contactDTO: ContactDTO) {
    return await this.contactRepository.updatePersonalData(id, contactDTO);
  }
  async deletePersonalData(id: string) {
    return await this.contactRepository.deletePersonalData(id);
  }
}
