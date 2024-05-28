import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuperAdmin {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  hashed_password: string;

  @Column({default:false})
  active:boolean;

  @Column({default:false})
  manager:boolean
}