import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {

  @IsNotEmpty()
  @IsString()
  eventName: string;

  @IsNotEmpty()
  // @IsDate()
  eventDate:Date

}
