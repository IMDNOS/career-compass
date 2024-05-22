import { IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from '../entities/static.entity';

export class CreateStaticDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;
}
