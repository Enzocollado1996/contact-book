import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Contact } from './contact.entity';
@Entity('phone')
export class Phone extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.phone)
  contact?: Contact[];

  @Column({ type: 'varchar' })
  number: string;

  @Column({ type: 'varchar' })
  type: string;
}
