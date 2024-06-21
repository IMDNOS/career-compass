import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuperAdmin {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string

  @Column({unique:true})
  email: string;

  @Column()
  hashed_password: string;

  @Column()
  age:number

  @Column()
  location:string

  @Column({default:false})
  manager:boolean
}