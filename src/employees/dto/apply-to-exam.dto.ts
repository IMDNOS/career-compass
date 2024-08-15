import { IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyToExamDto {
  @IsNotEmpty()
  @IsNumber()
  subcategoryId: number;
}