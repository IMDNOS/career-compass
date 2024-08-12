import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity({ name: 'notifications' })
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  notification_token: string;

  @Column()
  title: string;

  @Column({ type: 'longtext', nullable: true })
  body: any;

  @Column()
  device_type: string;

}