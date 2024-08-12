import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class AdminNotifications{

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne( ()  => Employee ,{nullable:true})
  employee: Employee;

  @ManyToOne( ()  => Company , { nullable:true })
  company: Company;

  @Column()
  body:string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;


}