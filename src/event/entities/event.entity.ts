import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Events {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event:string

  @Column()
  date:Date



}
