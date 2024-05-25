import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';


export class StaticDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class StaticsDto {
  @IsArray()
  @IsNotEmpty()
  @Type(() => StaticDto)
  items: StaticDto[];
}


export class SubcategoriesDto extends PartialType(StaticsDto) {}