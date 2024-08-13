import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Static, Type } from './entities/static.entity';

@Injectable()
export class StaticsService {

  constructor(@InjectRepository(Static) private staticRepository: Repository<Static>) {
  }

  async create(createStaticDto: CreateStaticDto) {
    try {
      return await this.staticRepository.save(createStaticDto);
    } catch {
      throw new HttpException('Duplicate static name', HttpStatus.BAD_REQUEST);
    }
  }

  // async findAllLevels() {
  //   return this.staticRepository.find({ where: { type: Type.Level } });
  // }

  // async findAllJobTypes() {
  //   return this.staticRepository.find({ where: { type: Type.Job_type } });
  // }

  // async findAllCategories() {
  //   return this.staticRepository.find({ where: { type: Type.Category } });
  // }


  async findAllStatics() {
    const levels = await this.staticRepository.find({ where: { type: Type.Level } });
    const jobTypes = await this.staticRepository.find({ where: { type: Type.Job_type } });
    const categories = await this.staticRepository.find({ where: { type: Type.Category } });

    return { levels, jobTypes, categories };
  }

  async getAllCategories() {
    return await this.staticRepository.find({ where: { type: Type.Category } });
  }


  async findOne(id: number) {
    const Static = await this.staticRepository.findOne({ where: { id: id } });

    if (!Static) {
      throw new HttpException(`Static with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return Static;
  }

  async update(id: number, updateStaticDto: UpdateStaticDto) {
    const Static = await this.findOne(id);

    Static.name = updateStaticDto.name;
    Static.type = updateStaticDto.type;

    try {
      await this.staticRepository.save(Static);
      return Static;
    } catch {
      throw new HttpException('Duplicate subcategory name', HttpStatus.BAD_REQUEST);
    }

  }

  async remove(id: number) {
    const Static = await this.staticRepository.findOne({ where: { id: id } });
    if (!Static) {
      throw new HttpException(`Static with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.staticRepository.remove(Static);
    return {
      statusCode: 200,
      message: `Static with id ${id} has been successfully removed`,
    };
  }


  //get all subcategories of a category
  async getSubcategoriesOfCategory(categoryId: number) {
    const category = await this.staticRepository.findOne({ where: { id: categoryId }, relations: ['subCategories'] });

    if (!category) {
      throw new HttpException(`Category with id ${categoryId} not found`, HttpStatus.NOT_FOUND);
    }

    return category.subCategories.map(subcategory => ({
      id: subcategory.id,
      name: subcategory.name,
      categoryId: category.id,
    }));
  }

  async getSubcategoriesOfCategories(categoriesArray: any) {

    const categoriesIds = categoriesArray.categories.split(',').map(Number);

    const categories = await this.staticRepository.find({
      where: { id: In(categoriesIds) },
      relations: ['subCategories'],
    });


    const subcategories = categories.flatMap(category => category.subCategories);


    return subcategories;
  }

}
