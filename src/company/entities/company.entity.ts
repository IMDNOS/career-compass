import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'company'})
export class Company {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

  @Column({unique:true})
  email: string;

  @Column()
  hashed_password: string;

  @Column()
  hashedRT: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @Column({default:false})
  premium: boolean;
}
