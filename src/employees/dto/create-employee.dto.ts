import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Gender } from "../entities/employee.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  hashRT: string | null;

  // @IsNotEmpty()
  resume: string;

  @IsEnum(Gender)
  gender: Gender;
}