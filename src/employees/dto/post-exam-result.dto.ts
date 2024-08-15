import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PostExamResultDto {

  @IsNotEmpty()
  @IsNumber()
  subcategoryId:number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  result :number

}