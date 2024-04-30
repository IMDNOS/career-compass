import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'employee_category' })
export class EmployeeCategory{
  @PrimaryGeneratedColumn()
  id: number;


}