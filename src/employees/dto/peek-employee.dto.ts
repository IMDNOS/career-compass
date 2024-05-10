import { IsEmail, IsNotEmpty } from 'class-validator';

export class PeekEmployeeDto{
  @IsNotEmpty()
  @IsEmail()
  email:string
}