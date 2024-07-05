import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';


export class  SetEducationAndExperienceDto{
  @IsNotEmpty()
  @IsString()
  experience:number

  @IsNotEmpty()
  @IsString()
  education: string;
}
