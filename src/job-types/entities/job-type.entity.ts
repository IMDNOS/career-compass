import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

}
