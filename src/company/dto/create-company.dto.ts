import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { State } from '../entities/company.entity';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(State)
  state: State;

  @IsString()
  address: string;

  @IsString()
  description: string;

}