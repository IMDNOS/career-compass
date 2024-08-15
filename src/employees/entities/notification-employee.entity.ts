import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { NotificationTokenEmployee } from './employee-notification-token.entity';

@Entity()
export class NotificationsEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'notificationToken'})
  @ManyToOne(() => NotificationTokenEmployee)
  notificationToken: NotificationTokenEmployee;


  @Column()
  title: string;

  @Column({ type: 'longtext', nullable: true })
  body: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

}