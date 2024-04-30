// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Category } from '../../categories/entities/category.entity';
// import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
// import { Gender } from '../../employees/entities/employee.entity';
// import { Type } from '../../types/entities/type.entity';
// import { Level } from '../../levels/entities/level.entity';
// export enum WorkTime {
//   PartTime = 'part time',
//   FullTime = 'full time',
//   FromHome='from home'
// }
//
// @Entity()
// export class Job {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @Column({ unique: true })
//   title: string;
//
//   @Column()
//   location: string;
//
//   @Column()
//   description: string ;
//
//   @Column()
//   salary: number;
//
//   @Column()
//   experience_years: string | null;
//
//   @Column()
//   image: string;
//
//   @Column()
//   resume: string;
//
//   @Column({ type: 'enum', enum: WorkTime })
//   work_time: WorkTime;
//
//   @Column({ type: 'enum', enum: Gender })
//   wanted_gender: Gender;
//
//   @Column({ name: 'category_id' })
//   categoryId: number;
//
//   @ManyToOne(() => Category, category => category.jobs)
//   @JoinColumn({ name: 'category_id' })
//   category: Category;
//
//   @Column({ name: 'sub_category_id' })
//   subCategoryId: number;
//
//   @ManyToOne(() => SubCategory, subCategory => subCategory.jobs)
//   @JoinColumn({ name: 'sub_category_id' })
//   subCategory: SubCategory;
//
//   @Column({ name: 'type_id' })
//   typeId: number;
//
//   @ManyToOne(() => Type, type => type.jobs)
//   @JoinColumn({ name: 'type_id' })
//   type: Type;
//
//   @Column({ name: 'level_id' })
//   levelId: number;
//
//   @ManyToOne(() => Level, level => level.jobs)
//   @JoinColumn({ name: 'level_id' })
//   level: Level;
//
//   // @Column({ name: 'sub_category_id' })
//   // subCategoryId: number;
//   //
//   // @ManyToOne(() => SubCategory, subCategory => subCategory.employees)
//   // @JoinColumn({ name: 'sub_category_id' })
//   // subCategory: SubCategory;
//
//
// }
//
//
//
//

// Job entity
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
// import { Gender } from '../../employees/entities/employee.entity';
import { Type } from '../../types/entities/type.entity';
import { Level } from '../../levels/entities/level.entity';

export enum WorkTime {
  PartTime = 'part time',
  FullTime = 'full time',
  FromHome = 'from home'
}
export enum Gender {
  Male = 'male',
  Female = 'female'
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  salary: number;

  @Column()
  experience_years: string | null;

  @Column()
  image: string;

  @Column()
  resume: string;

  @Column({ type: 'enum', enum: WorkTime })
  work_time: WorkTime;

  @Column({ type: 'enum', enum: Gender })
  wanted_gender: Gender; // Add enum property here with values of Gender enum

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, category => category.jobs)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'sub_category_id' })
  subCategoryId: number;

  @ManyToOne(() => SubCategory, subCategory => subCategory.jobs)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;

  @Column({ name: 'type_id' })
  typeId: number;

  @ManyToOne(() => Type, type => type.jobs)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @Column({ name: 'level_id' })
  levelId: number;

  @ManyToOne(() => Level, level => level.jobs)
  @JoinColumn({ name: 'level_id' })
  level: Level;
}
