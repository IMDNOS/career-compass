import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, Max, Min } from 'class-validator';

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

  @Column()
  address:string

  @Column()
  description: string;

  @Column({nullable:true})
  logo: string;

  @Column({ type: 'int', default: 0 })
  @IsInt()
  @Min(0)
  @Max(10)
  premiumLevel: number;

  @Column({default:100})
  wallet:number


  @Column({default:false})
  active: boolean;
}
