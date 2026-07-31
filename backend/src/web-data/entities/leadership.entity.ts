import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('leadership')
export class Leadership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  nameAm: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  roleAm: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  experience: string;

  @Column('simple-array', { nullable: true })
  certificates: string[];

  @Column('simple-array', { nullable: true })
  awards: string[];

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
