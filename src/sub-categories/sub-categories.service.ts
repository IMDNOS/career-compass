import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { Static ,Type } from 'src/statics/entities/static.entity';


@Injectable()
export class SubCategoriesService {

  constructor(
    @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Static) private staticRepository: Repository<Static>
  ) {
  }

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const id_category = createSubCategoryDto.categoryId;

    const category = await this.staticRepository.findOne({where: {
        id: +id_category,
        type: Type.Category} });

    if (!category) {
      throw new HttpException(`Category with id ${id_category} not found`,HttpStatus.NOT_FOUND)
    }
    const subcategory = this.subCategoryRepository.create({
      name: createSubCategoryDto.name,
      category: category,
    });

    try {
      return await this.subCategoryRepository.save(subcategory);
    } 
    catch {
        throw new HttpException('Duplicate subcategory name',HttpStatus.BAD_REQUEST)
      }
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
      throw new HttpException(`Subcategory with id ${id} not found`,HttpStatus.NOT_FOUND)
    }

    const category = await this.staticRepository.findOne({ where: { id: +updateSubCategoryDto.categoryId } });
    if (!category) {
      throw new HttpException(`Category with id ${updateSubCategoryDto.categoryId} not found`,HttpStatus.NOT_FOUND)
    }

    subcategory.name=updateSubCategoryDto.name
    subcategory.category=category

    try {
      return await this.subCategoryRepository.save(subcategory);
    }
    catch {
      throw new HttpException('Duplicate subcategory name',HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    const subcategory = await this.subCategoryRepository.findOne({where:{id:id}})
    if (!subcategory) {
      throw new HttpException(`Subcategory with id ${id} not found`,HttpStatus.NOT_FOUND)
    }

    await this.subCategoryRepository.remove(subcategory);
    return {
      statusCode: 200,
      message: `SubCategory with id ${id} has been successfully removed`,
    };
  }
}
