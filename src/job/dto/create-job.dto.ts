import { Gender } from '../entities/job.entity';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Company } from '../../company/entities/company.entity';


export class CreateJobDto {

  @IsNotEmpty()
  title: string;


  company: Company;


  @IsNotEmpty()
  @IsNumber()
  typeId:number


  @IsNotEmpty()
  @IsNumber()
  levelId:number

  @IsArray()
  @ArrayNotEmpty()
  subCategoryIds: number[];

  @IsString()
  @IsOptional()
  description: string | null;

  @IsNumber()
  @IsOptional()
  salary: number | null;

  @IsNumber()
  @IsOptional()
  work_hours: number | null;

  @IsNumber()
  @IsOptional()
  experience_years: number | null;

  @IsEnum(Gender)
  @IsOptional()
  wanted_gender: Gender | null;
}
