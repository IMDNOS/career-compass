import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

}
