import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactDTO } from './dto/contact.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Post()
  saveCar(@Body() contactDTO: ContactDTO) {
    return this.contactService.save(contactDTO);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.contactService.findByEmail(email);
  }

  @Get()
  @Get('name/:name')
  findByPersonalData(@Param('name') name: string) {
    return this.contactService.findByPersonalData(name);
  }

  @Get()
  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.contactService.findByPhone(phone);
  }

  @Get()
  @Get('city')
  findByCity() {
    return this.contactService.findByCity();
  }

  @Put(':id')
  updatePersonalData(@Param('id') id: string, @Body() contactDTO: ContactDTO) {
    return this.contactService.updatePersonalData(id, contactDTO);
  }

  @Delete(':id')
  deletePersonalData(@Param('id') id: string) {
    return this.contactService.deletePersonalData(id);
  }
}
