import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { NotificationTokenCompany } from './company-notification-token.entity';

@Entity()
export class NotificationsCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'notificationTokenCompany'})
  @ManyToOne(() => NotificationTokenCompany)
  notificationTokenCompany: NotificationTokenCompany;


  @Column()
  title: string;

  @Column({ type: 'longtext', nullable: true })
  body: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

}