import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('social')
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0 })
  order: number;
}
