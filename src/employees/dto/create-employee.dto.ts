import { IsEmail, IsNotEmpty, IsEnum, IsDate } from 'class-validator';
import { Gender } from '../entities/employee.entity';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  home_address: string;

  description: string;

  @IsDate()
  @Type(() => Date)
  birthday_date: Date;

  // categoryId: number[] | null ;
  //
  // subcategoryId: number[] | null ;
  //
  // levelId: number[] | null ;
  //
  // jobtypeId: number[] | null ;

}