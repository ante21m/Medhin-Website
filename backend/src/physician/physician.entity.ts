import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('physicians')
export class Physician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  nameAm: string;

  @Column()
  specialty: string;

  @Column({ nullable: true })
  specialtyAm: string;

  @Column({ nullable: true })
  image: string;

  @Column('decimal', { precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviews: number;

  @Column({ default: true })
  available: boolean;

  @Column({ nullable: true })
  availabilityText: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column('text', { nullable: true })
  bioAm: string;

  @Column({ nullable: true })
  experience: string;

  @Column('simple-json', { nullable: true })
  languages: string[];

  @Column('simple-json', { nullable: true })
  education: string[];

  @Column('simple-json', { nullable: true })
  certifications: string[];

  @Column('simple-json', { nullable: true })
  specialtiesList: string[];

  @Column('simple-json', { nullable: true })
  procedures: string[];

  @Column({ nullable: true })
  experienceYears: number;

  @Column({ nullable: true })
  patientsCount: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
