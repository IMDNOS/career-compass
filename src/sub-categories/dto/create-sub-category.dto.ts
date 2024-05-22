import { IsNotEmpty } from 'class-validator';
import { Static } from '../../statics/entities/static.entity';

export class CreateSubCategoryDto {

  @IsNotEmpty()
  name:string

  @IsNotEmpty()
  categoryId:Static
}
