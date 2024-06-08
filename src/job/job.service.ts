import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
// import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { In, Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Static ,Type} from '../statics/entities/static.entity';


@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Static) private staticRepository: Repository<Static>,
    @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
  ) {}

  // async create(createJobDto: CreateJobDto, companyId: number) {
  //   const company = await this.companyRepository.findOne({where: { id: companyId },
  //     select: ["id", "company_name", "email", "state", "description", "logo", "premium"]});
  //   const jobType = await this.jobTypeRepository.findOne({ where: { id: createJobDto.typeId } });
  //   const level = await this.levelRepository.findOne({ where: { id: createJobDto.levelId } });
  //   const subCategories = [];
  //
  //   for (const subCategoryId of createJobDto.subCategoryIds) {
  //     const subCategory = await this.subCategoryRepository.findOne({ where: { id: subCategoryId } });
  //     if (subCategory) {
  //       subCategories.push(subCategory);
  //     }
  //   }
  //
  //   let category: Category | undefined;
  //   if (subCategories.length > 0) {
  //     const firstSubCategory = subCategories[0];
  //     const firstSubCategoryId = firstSubCategory.categoryId;
  //
  //     // Fetch the category using the category ID of the first subcategory
  //     category = await this.categoryRepository.findOne({ where: { id: firstSubCategoryId } });
  //   }
  //   const job = this.jobRepository.create({
  //     title: createJobDto.title,
  //     company: company,
  //     jobType: jobType,
  //     level: level,
  //     description: createJobDto.description,
  //     salary: createJobDto.salary,
  //     work_hours: createJobDto.work_hours,
  //     wanted_gender: createJobDto.wanted_gender,
  //     experience_years: createJobDto.experience_years,
  //     category: category,
  //     subCategories: subCategories,
  //   });
  //
  //   return this.jobRepository.save(job);
  // }

  getUniqueStaticEntities(categories1: Static[], subCategories: SubCategory[]): Static[] {
    const uniqueStaticMap = new Map<number, Static>();

    categories1.forEach(category => uniqueStaticMap.set(category.id, category));

    subCategories.forEach(subCategory => {
      if (subCategory.category) {
        uniqueStaticMap.set(subCategory.category.id, subCategory.category);
      }
    });

    return Array.from(uniqueStaticMap.values());
  }

async create(createJobDto: CreateJobDto, companyId: number): Promise<Job> {
        const company = await this.companyRepository.findOne({
          where: { id: companyId },
          select: ["id", "company_name", "email", "address", "description", "logo", "premium"],
        });

        if (!company) {
        throw new NotFoundException(`Company with ID ${companyId} not found`);
      }

      const jobType = await this.staticRepository.findOne({ where: { id: createJobDto.typeId } });
      const level = await this.staticRepository.findOne({ where: { id: createJobDto.levelId } });

      if (!jobType || !level) {
        throw new NotFoundException(`Job type or level not found`);
      }

      const categories1 = await this.staticRepository.find({
        where: { id: In(createJobDto.categoryIds), type: Type.Category },
      });

      const subCategories = await this.subCategoryRepository.find({
        where: { id: In(createJobDto.subCategoryIds) },
        relations: { category: true },
      });

      const uniqueStatics = this.getUniqueStaticEntities(categories1, subCategories);

      const job = this.jobRepository.create({
        company: company,
        description: createJobDto.description,
        experience_years: createJobDto.experience_years,
        salary: createJobDto.salary,
        subCategories: subCategories,
        title: createJobDto.title,
        wanted_gender: createJobDto.wanted_gender,
        work_hours: createJobDto.work_hours,
        static: [level, jobType, ...uniqueStatics],
      });

      await this.jobRepository.save(job);

      return job;
    }


      // async create(createJobDto: CreateJobDto, companyId: number) {
  //   const company = await this.companyRepository.findOne({ where: { id: companyId },
  //     select: ["id", "company_name", "email", "address", "description", "logo", "premium"] });
  //
  //   const jobType = await this.staticRepository.findOne({ where: { id: createJobDto.typeId } });
  //   const level = await this.staticRepository.findOne({ where: { id: createJobDto.levelId } });
  //   const categories1 = await this.staticRepository.find({ where: { id: In(createJobDto.categoryIds) ,type: Type.Category} });
  //   const subCategories = await this.subCategoryRepository.find({
  //     where: { id: In(createJobDto.subCategoryIds) },
  //     relations: { category: true }
  //   });
  //
  //   let categories2: Static = [];
  //   if (subCategories.length > 0) {
  //     const firstSubCategory = subCategories[0];
  //     categories2 = firstSubCategory.category;
  //   }
  //   const categories =[...categories1, ...categories2];
  //   job.static = [...categories, level, jobType];
  //   const job = this.jobRepository.create({
  //     company: company,
  //     description: createJobDto.description,
  //     experience_years: createJobDto.experience_years,
  //     salary: createJobDto.salary,
  //     subCategories: subCategories,
  //     title: createJobDto.title,
  //     wanted_gender: createJobDto.wanted_gender,
  //     work_hours: createJobDto.work_hours,
  //   });
  //
  //   return this.jobRepository.save(job);
  // }

  // async findAll(): Promise<Job[]> {
  //   return this.jobRepository.find({
  //     relations: ['category', 'subCategories', 'level', 'jobType'],
  //     select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","wanted_gender"]
  //   });
  // }

  // async findOne(id: number): Promise<Job[]> {
  //   return await this.jobRepository.find({
  //     where:{id:id},
  //     relations: ['category', 'subCategories', 'level', 'jobType'],
  //     select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","wanted_gender"]
  //   });
  // }

  // update(id: number, updateJobDto: UpdateJobDto) {
  //   return `This action updates a #${id} job`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} job`;
  // }

}