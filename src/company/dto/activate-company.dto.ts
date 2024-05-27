import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ActivateCompanyDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  activationCode:string;
}