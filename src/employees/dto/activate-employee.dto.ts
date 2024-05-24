import { IsEmail, IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { Gender } from "../entities/employee.entity";

export class ActivateEmployeeDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  activationCode:string;
}