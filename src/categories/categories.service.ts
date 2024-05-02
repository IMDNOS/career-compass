import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) public categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory) public subcategoryRepository: Repository<SubCategory>,
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      name: createCategoryDto.name,
    });

    if (!category) {
      throw new ForbiddenException(`Category not found`);
    }

    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id: id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }


  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id: id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = updateCategoryDto.name;

    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id: id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.remove(category);

    return { message: 'Category removed successfully' };
  }


  //get all subcategories of a category

  async getSubcategoriesOfCategory(categoryId: number) {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['subCategories'] });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category.subCategories.map(subcategory => ({
      id: subcategory.id,
      name: subcategory.name,
      categoryId: category.id,
    }));

  }


}
