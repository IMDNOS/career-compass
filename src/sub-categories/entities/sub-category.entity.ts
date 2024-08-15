import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Static } from '../../statics/entities/static.entity';
import { EmployeeSubCategory } from '../../employees/entities/employeeSubcategory.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Static)
  @JoinColumn({ name: 'categoryId' })
  category: Static;

  @Column({default:false})
  exam_available:boolean
}
