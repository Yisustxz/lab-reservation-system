import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Computer } from './computer.entity';

@Entity('reservations')
@Unique(['computer_id', 'fecha', 'hora'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'computer_id' })
  computer_id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'integer', default: 60 })
  duracion: number;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Computer, (computer) => computer.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'computer_id' })
  computer: Computer;
}
