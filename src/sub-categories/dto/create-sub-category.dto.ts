import { IsNotEmpty } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

export class CreateSubCategoryDto {

  @IsNotEmpty()
  name:string

  @IsNotEmpty()
  categoryId:Category
}
