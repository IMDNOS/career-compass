import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


export enum Type {
  Category = 'category',
  Job_type = 'job type',
  Level='level'
}
@Entity()
export class Static {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  name: string;

  @Column({ type: 'enum', enum: Type })
  type: Type;

  @OneToMany(() => SubCategory, subcategory => subcategory.category)
  subCategories: SubCategory[];

}

