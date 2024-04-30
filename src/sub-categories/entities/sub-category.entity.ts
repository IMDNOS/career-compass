
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Job } from '../../job/entities/job.entity';


@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Employee, employee => employee.subCategory)
  employees: Employee[];

  @OneToMany(() => Job, job => job.subCategory)
  jobs: Job[];
}

