import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSuperAdminDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
