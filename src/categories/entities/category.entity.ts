
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';


@Entity()
export class Category {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @OneToMany(() => SubCategory, subcategory => subcategory.category)
   subCategories: SubCategory[];
}

