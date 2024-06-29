import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Job } from './job.entity';

@Entity()
export class Employee_job {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  employee: Employee;

  @ManyToOne(() => Job)
  job: Job;

  @Column({default:false})
  accepted: boolean;

}