import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Contact } from './contact.entity';
@Entity('location')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.phone)
  contact?: Contact[];

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  street: string;

  @Column()
  number: string;

  @Column({ type: 'varchar' })
  description: string;
}
