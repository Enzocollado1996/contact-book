import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @Get('name/:name')
  findByPersonalData(@Param('name') name: string) {
    return this.contactService.findByPersonalData(name);
  }

  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.contactService.findByPhone(phone);
  }

  @Get('city')
  findByCity(@Query() query) {
    return this.contactService.findByCity(query.city);
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
