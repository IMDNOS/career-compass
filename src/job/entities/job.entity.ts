import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { JobType } from '../../job-types/entities/job-type.entity';
import { Level } from '../../levels/entities/level.entity';
import { Company } from '../../company/entities/company.entity';

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

  @Column({ nullable: true, default: null })
  experience_years: number;

  @Column({ type: 'enum', enum: Gender  ,nullable:true})
  wanted_gender: Gender;

  // one to many with category
  @ManyToOne(() => Category)
  category: Category;


  // many to many with subcategory
  @ManyToMany(() => SubCategory)
  @JoinTable({name:'job_subcategories'})
  subCategories: SubCategory[];


  // Many-to-One relationship with JobType
  @ManyToOne(() => JobType)
  jobType: JobType;

  // Many-to-One relationship with Level
  @ManyToOne(() => Level)
  level: Level;

}
