import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// export enum State {
//   Aleppo = 'Aleppo',
//   Damascus = 'Damascus',
//   Homs = 'Homs',
//   Hama = 'Hama',
//   Latakia = 'Latakia',
//   Tartous = 'Tartous',
//   DeirEzzor = 'Deir Ezzor',
//   Raqqa = 'Raqqa',
//   Idlib = 'Idlib',
//   Daraa = 'Daraa',
//   AlHasakah = 'Al-Hasakah',
//   Suwayda = 'Suwayda',
//   AlQuneitra = 'AlQuneitra '
// }


@Entity({name:'company'})
export class Company {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

  @Column({unique:true})
  email: string;

  @Column({unique:true})
  phone: string;

  @Column()
  hashed_password: string;

  @Column({nullable:true})
  hashedRT: string | null;

  @Column({nullable:true})
  hashedCode:string | null;

  // @Column({ type: 'enum', enum: State })
  // state: State;

  @Column()
  address:string

  @Column()
  description: string;

  @Column({nullable:true})
  logo: string;

  @Column({default:false})
  premium: boolean;
  @Column({default:false})
  active: boolean;
}
