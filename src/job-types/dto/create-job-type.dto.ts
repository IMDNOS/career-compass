import { IsNotEmpty } from 'class-validator';

export class CreateJobTypeDto {
  @IsNotEmpty()
  name:string
}
