import { IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyToJobDto{

  @IsNotEmpty()
  @IsNumber()
  job_id:number
}