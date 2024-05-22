
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn ,JoinTable} from 'typeorm';
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
  hashed_password: string;

  @Column()
  hashedRT: string | null;

  @Column()
  image: string;

  @Column()
  resume: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;


  @ManyToMany(() => Static)
  @JoinTable({name:'employee_statics'})
  static: Static[];

  @ManyToMany(() => SubCategory)
  @JoinTable({name:'employee_subcategory'})
  subcategory: SubCategory[];




}