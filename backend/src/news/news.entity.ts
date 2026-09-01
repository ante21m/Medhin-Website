import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleAm: string;

  @Column('text', { nullable: true })
  content: string;

  @Column('text', { nullable: true })
  contentAm: string;

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  summaryAm: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  attachment: string;

  @Column({ default: 'admin' })
  author: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
