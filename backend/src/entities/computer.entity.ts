import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { Lab } from './lab.entity';

@Entity('computers')
export class Computer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'lab_id' })
  lab_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Lab, (lab) => lab.computers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lab_id' })
  lab: Lab;

  @OneToMany(() => Reservation, (reservation) => reservation.computer, {
    cascade: true,
  })
  reservations: Reservation[];
}
