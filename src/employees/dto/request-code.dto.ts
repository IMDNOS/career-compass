import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestCodeDto{

  @IsEmail()
  @IsNotEmpty()
  email: string;
}