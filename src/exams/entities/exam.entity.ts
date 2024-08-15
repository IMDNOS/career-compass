import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';

export enum Options{
  a='a',
  b='b',
  c='c',
  d='d'
}


@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> SubCategory)
  subCategory: SubCategory;

  @Column({unique:true})
  question:string

  @Column()
  a:string

  @Column()
  b:string

  @Column({nullable:true})
  c:string|null

  @Column({nullable:true})
  d:string|null

  @Column()
  answer:Options

}

