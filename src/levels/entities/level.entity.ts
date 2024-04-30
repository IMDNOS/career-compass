import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '../../job/entities/job.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Job, job => job.level)
  jobs: Job[];
}
