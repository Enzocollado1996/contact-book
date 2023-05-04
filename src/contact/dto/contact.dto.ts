import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ContactDTO {
  @ApiProperty({
    description: 'El campo nombre es requerido',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'El campo apellido es requerido',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'El campo documento es requerido',
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    description: 'El campo número de documento es requerido',
  })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({
    description: 'El campo edad es requerido',
  })
  @IsString()
  @IsNotEmpty()
  age: string;

  @ApiProperty({
    description: 'El campo email es requerido',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  phone: Phone[];
  location: Location[];
}
class Phone {
  @ApiProperty({
    description: 'El campo telefono es requerido',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'El campo tipo de telefono es requerido',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}

class Location {
  @ApiProperty({
    description: 'El campo ciudad es requerido',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'El campo calle es requerido',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    description: 'El campo numero de calle es requerido',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  description: string;
}
