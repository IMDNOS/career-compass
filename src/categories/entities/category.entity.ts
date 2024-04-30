
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Job } from '../../job/entities/job.entity';


@Entity()
export class Category {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   name: string;

   @ManyToMany(() => Employee, employee => employee.category)
   employees: Employee[];

   @OneToMany(() => Job, job => job.category)
   jobs: Job[];
}

