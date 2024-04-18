import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";


export enum Gender {
  Male = 'male',
  Female = 'female'
}
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column({unique:true})
  email: string;

  @Column ()
  hashed_password:string;

  @Column()
  hashedRT:string | null;

  @Column()
  resume:string;

  @Column({ type: "enum", enum: Gender, })
  gender: Gender;


  // @ManyToOne(() => Category, category => category.employees)
  // category: Category;

  // @ManyToOne(() => SubCategory, subCategory => subCategory.employees)
  // subCategory: SubCategory;



}
