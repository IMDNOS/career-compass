import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class ActivateEmployeeDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  activationCode:string;
}