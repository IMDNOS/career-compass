
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn ,JoinTable} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';


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

  @Column({ unique: true })
  phone: string;

  @Column()
  hashed_password: string;

  @Column()
  hashedRT: string | null;

  @Column()
  image: string;

  @Column()
  resume: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;


  @ManyToMany(() => Category, category => category.employees)
  @JoinTable({ name: 'employee_category_id' })
  category: Category;

  @Column({ name: 'sub_category_id' })
  subCategoryId: number;

  @ManyToOne(() => SubCategory, subCategory => subCategory.employees)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;
}

