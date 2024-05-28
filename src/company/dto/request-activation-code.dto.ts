import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestActivationCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email:string
}