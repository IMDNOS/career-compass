
import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';


@Entity()
export class NotificationTokenEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'employee'})
  @OneToOne(() => Employee)
  employee: Employee;

  @Column()
  device_type: string;

  @Column()
  notification_token: string;

}