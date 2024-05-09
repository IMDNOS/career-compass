import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Gender } from "../entities/employee.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  categoryId: number[] | null ;

  subcategoryId: number[] | null ;

  levelId: number[] | null ;

  jobtypeId: number[] | null ;
}