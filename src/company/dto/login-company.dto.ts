import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCompanyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}