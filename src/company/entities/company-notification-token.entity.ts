
import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Company } from './company.entity';


@Entity()
export class NotificationTokenCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'company'})
  @OneToOne(() => Company)
  company: Company;

  @Column()
  device_type: string;

  @Column()
  notification_token: string;

}