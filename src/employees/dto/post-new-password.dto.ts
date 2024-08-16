import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PostNewPasswordDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  activationCode:string;


}