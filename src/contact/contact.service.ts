import { Injectable } from '@nestjs/common';
import { ContactDTO } from './dto/contact.dto';

@Injectable()
export class ContactService {
  async save(contactDTO: ContactDTO) {
    return { contactDTO };
  }

  async findByEmail(email: string) {
    return { email };
  }

  async findByPersonalData(name: string) {
    return { name };
  }

  async findByPhone(phone: string) {
    return { phone };
  }

  async findByCity() {
    return { message: 'city' };
  }

  async updatePersonalData(id: string, contactDTO: ContactDTO) {
    return { contactDTO };
  }
  async deletePersonalData(id: string) {
    return { id };
  }
}
