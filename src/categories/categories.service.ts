import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) public categoryRepository: Repository<Category>) {
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

}
