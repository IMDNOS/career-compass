import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuperAdmin {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  email: string;

  @Column()
  hashed_password: string;


  @Column({default:false})
  manager:boolean
}