import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact/entities/contact.entity';
import { Phone } from './contact/entities/phone.entity';
import { Location } from './contact/entities/location.entity';
import commonConfig from './config/common.config';
import { ContactRepository } from './contact/repository/contact.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [commonConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [Contact, Phone, Location],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Contact, Phone, Location]),
  ],
  controllers: [ContactController, AppController],
  providers: [ContactService, AppService, ContactRepository],
})
export class AppModule {}
