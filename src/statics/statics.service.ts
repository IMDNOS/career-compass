import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Static , Type} from './entities/static.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';

@Injectable()
export class StaticsService {

  constructor(@InjectRepository(Static) private staticRepository: Repository<Static>,
  @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>) {
  }
  
  async create(createStaticDto: CreateStaticDto) {
    return await this.staticRepository.save(createStaticDto);
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
  

  async findAllStatics(): Promise<{ levels: Static[], jobTypes: Static[], categories: Static[] }> {
    const levels = await this.staticRepository.find({ where: { type: Type.Level } });
    const jobTypes = await this.staticRepository.find({ where: { type: Type.Job_type } });
    const categories = await this.staticRepository.find({ where: { type: Type.Category } });

    return { levels, jobTypes, categories };
  }

  async findOne(id: number) {
    return await this.staticRepository.findOne({
      where:{id:id}
    }
    );
  }
  //
  // update(id: number, updateStaticDto: UpdateStaticDto) {
  //   return `This action updates a #${id} static`;
  // }
  //
   async remove(id: number) {
    const Static = await this.staticRepository.findOne({where:{id:id}});
    if (!Static) {
      return {
        statusCode: 404,
        message: `Static with id ${id} not found`,
      };
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
      throw new NotFoundException('Category not found');
    }

    return category.subCategories.map(subcategory => ({
      id: subcategory.id,
      name: subcategory.name,
      categoryId: category.id,
    }));

  }

}
