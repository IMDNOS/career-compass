import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { Company } from '../../company/entities/company.entity';
import { Static } from '../../statics/entities/static.entity';

export enum Gender {
  Male = 'male',
  Female = 'female'
}

@Entity()
export class Job {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  title: string;

  @ManyToOne(() => Company)
  company: Company;

  @Column()
  description: string;

  @Column({nullable:true})
  salary: number;

  @Column({nullable:true})
  work_hours: number;

  @Column({nullable:true})
  number_of_employees: number;

  @Column({ nullable: true, default: null })
  experience_years: number;

  @Column({ type: 'enum', enum: Gender  ,nullable:true})
  wanted_gender: Gender;

  @Column({default:false})
  active: boolean;

  @ManyToMany(() => Static)
  @JoinTable({name:'job_statics'})
  static : Static[];

  @ManyToMany(() => SubCategory)
  @JoinTable({name:'job_subcategories'})
  subCategories: SubCategory[];


}
