import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuperAdmin {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
 hashed_password: string;
}
