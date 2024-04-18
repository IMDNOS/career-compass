import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginEmployeeDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}