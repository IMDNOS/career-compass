import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';

@Entity({ name: 'employee_subcategory' })
export class EmployeeSubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  certification: number|null;

  @ManyToOne(() => Employee)
  employee: Employee;

  @ManyToOne(() => SubCategory)
  subcategory: SubCategory;
}
