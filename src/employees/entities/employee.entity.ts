import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { Static } from '../../statics/entities/static.entity';


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
  home_address:string

  @Column({ type: 'date' })
  birthday_date: Date;

  @Column()
  hashed_password: string;

  @Column({nullable:true})
  hashedRT: string | null;

  @Column({ default: false })
  active: boolean;

  @Column({nullable:true})
  hashedCode:string | null;

  @Column({nullable:true})
  description:string | null;

  @Column({nullable:true})
  image: string;

  @Column({nullable:true})
  resume: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;


  @ManyToMany(() => Static)
  @JoinTable({ name: 'employee_statics' })
  static: Static[];

  @ManyToMany(() => SubCategory)
  @JoinTable({ name: 'employee_subcategory' })
  subcategory: SubCategory[];


}