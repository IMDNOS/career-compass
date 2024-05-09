
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn ,JoinTable} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { Level } from '../../levels/entities/level.entity';
import { JobType } from '../../job-types/entities/job-type.entity';


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


  @ManyToMany(() => Category)
  @JoinTable({name:'employee_category'})
  category: Category[];

  @ManyToMany(() => SubCategory)
  @JoinTable({name:'employee_subcategory'})
  subcategory: SubCategory[];

  @ManyToMany(() => Level)
  @JoinTable({name:'employee_level'})
  level: Level[];

  @ManyToMany(() => JobType)
  @JoinTable({name:'employee_jobtype'})
  jobtype: JobType[];


}