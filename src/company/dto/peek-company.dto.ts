import { IsEmail, IsNotEmpty } from 'class-validator';

export class PeekCompanyDto{
  @IsNotEmpty()
  @IsEmail()
  email:string
}