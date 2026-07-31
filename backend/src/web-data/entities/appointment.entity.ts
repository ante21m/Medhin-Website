import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: string;

  @Column()
  doctorName: string;

  @Column({ nullable: true })
  doctorSpecialty: string;

  @Column()
  patientName: string;

  @Column()
  patientPhone: string;

  @Column({ nullable: true })
  patientEmail: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'date' })
  appointmentDate: string;

  @Column()
  appointmentTime: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
