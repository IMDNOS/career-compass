import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginSuperAdminDto{
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
