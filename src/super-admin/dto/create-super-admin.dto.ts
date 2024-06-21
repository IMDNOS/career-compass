import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSuperAdminDto {

  @IsNotEmpty()
  name: string;


  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  password: string;

}
