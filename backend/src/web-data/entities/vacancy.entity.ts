import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vacancies')
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleAm: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  descriptionAm: string;

  @Column('text', { nullable: true })
  requirements: string;

  @Column('text', { nullable: true })
  requirementsAm: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  deadline: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
