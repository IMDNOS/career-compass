import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';
import { Static } from '../../statics/entities/static.entity';
import { EmployeeSubCategory } from './employeeSubcategory.entity';

export enum Gender {
  Male = 'male',
  Female = 'female'
}

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  home_address: string;

  @Column({ type: 'date' })
  birthday_date: Date;

  @Column()
  hashed_password: string;

  @Column({ nullable: true })
  hashedRT: string | null;

  @Column({ default: false })
  active: boolean;

  @Column({ nullable: true })
  hashedCode: string | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  resume: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ nullable: true })
  experience: number | null;

  @Column({ nullable: true })
  education: string | null;

  @ManyToMany(() => Static)
  @JoinTable({ name: 'employee_statics' })
  static: Static[];

}
