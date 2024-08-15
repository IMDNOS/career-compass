import { Options } from '../entities/exam.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExamDto {

  @IsNotEmpty()
  @IsNumber()
  subcategoryId:number

  @IsNotEmpty()
  @IsString()
  question:string

  @IsNotEmpty()
  a:string

  @IsNotEmpty()
  b:string

  c:string

  d:string

  @IsNotEmpty()
  answer:Options

}
