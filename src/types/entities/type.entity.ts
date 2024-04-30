// import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Job } from '../../job/entities/job.entity';
//
// export class Type {
//
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @Column({ unique: true })
//   name: string;
//
//   @OneToMany(() => Job, job => job.type)
//   jobs: Job[];
//
// }

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '../../job/entities/job.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Job, job => job.type)
  jobs: Job[];
}
