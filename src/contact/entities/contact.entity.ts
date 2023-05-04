import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Phone } from './phone.entity';
import { Location } from './location.entity';

@Entity('contact')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar' })
  document: string;

  @Column({ type: 'varchar' })
  documentNumber: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  email: string;

  @OneToMany(() => Phone, (phone) => phone.id)
  @JoinColumn({ name: 'contactId' })
  phone: Phone[];

  @OneToMany(() => Location, (location) => location.id)
  @JoinColumn({ name: 'contactId' })
  location: Location[];
}
