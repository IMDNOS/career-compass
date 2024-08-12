//
// import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Employee } from '../../employees/entities/employee.entity';
//
// @Entity({ name: 'notification_tokens_employees' })
// export class NotificationTokenEmployee {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @JoinColumn({ name: 'employee_id', referencedColumnName: 'id' })
//   @ManyToOne(() => Employee)
//   employee: Employee;
//
//   @Column()
//   device_type: string;
//
//   @Column()
//   notification_token: string;
//
//   @Column({ default: 'ACTIVE' })
//   status: string;
// }