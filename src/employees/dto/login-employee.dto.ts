import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}