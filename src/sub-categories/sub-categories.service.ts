import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class SubCategoriesService {

  constructor(
    @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {
  }

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const id_category = createSubCategoryDto.categoryId;

     const category = await this.categoryRepository.findOne({ where: { id: +id_category } });
        if (!category) {
          return {
            statusCode: 400,
            message: 'Bad Request: No such category found',
          };
        }

    const subcategory = this.subCategoryRepository.create({
      name: createSubCategoryDto.name,
      category: category,
    });

    return await this.subCategoryRepository.save(subcategory);
  }


  async findAll() {
    return await this.subCategoryRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    return await this.subCategoryRepository.findOne({where:{id:id},relations:['category']});
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subcategory = await this.subCategoryRepository.findOne({where:{id:id},relations:['category']});
    if (!subcategory) {
      return {
        statusCode: 404,
        message: `SubCategory with id ${id} not found`,
      };
    }

    const category = await this.categoryRepository.findOne({ where: { id: +updateSubCategoryDto.categoryId } });
    if (!category) {
      return {
        statusCode: 400,
        message: 'Bad Request: No such category found',
      };
    }

    subcategory.name=updateSubCategoryDto.name
    subcategory.category=category

    await this.subCategoryRepository.update(subcategory.id,subcategory);
    return await this.subCategoryRepository.save(subcategory);
  }

  async remove(id: number) {
    const subcategory = await this.subCategoryRepository.findOne({where:{id:id}});
    if (!subcategory) {
      return {
        statusCode: 404,
        message: `SubCategory with id ${id} not found`,
      };
    }

    await this.subCategoryRepository.remove(subcategory);
    return {
      statusCode: 200,
      message: `SubCategory with id ${id} has been successfully removed`,
    };
  }
}
