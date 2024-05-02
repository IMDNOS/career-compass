import { IsNotEmpty } from 'class-validator';

export class CreateLevelDto {
  @IsNotEmpty()
  name:string
}
