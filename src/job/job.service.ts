import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { In, Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { JobType } from '../job-types/entities/job-type.entity';
import { Level } from '../levels/entities/level.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(JobType) private jobTypeRepository: Repository<JobType>,
    @InjectRepository(Level) private levelRepository: Repository<Level>,
    @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
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

  async create(createJobDto: CreateJobDto, companyId: number) {
    const company = await this.companyRepository.findOne({ where: { id: companyId },
      select: ["id", "company_name", "email", "state", "description", "logo", "premium"] });
    const jobType = await this.jobTypeRepository.findOne({ where: { id: createJobDto.typeId } });
    const level = await this.levelRepository.findOne({ where: { id: createJobDto.levelId } });
    const subCategories = await this.subCategoryRepository.find({
      where: { id: In(createJobDto.subCategoryIds) },
      relations: { category: true }
    });

    let category: Category | undefined;
    if (subCategories.length > 0) {
      const firstSubCategory = subCategories[0];
      category = firstSubCategory.category;
    }

    const job = this.jobRepository.create({
      category: category,
      company: company,
      description: createJobDto.description,
      experience_years: createJobDto.experience_years,
      jobType: jobType,
      level: level,
      salary: createJobDto.salary,
      subCategories: subCategories,
      title: createJobDto.title,
      wanted_gender: createJobDto.wanted_gender,
      work_hours: createJobDto.work_hours,
    });

    return this.jobRepository.save(job);
  }


  async findAll(companyID: number): Promise<Job[]> {
    return this.jobRepository.find({
      where: { company: { id: companyID } }, // Filter by company ID,
      relations: ['category', 'subCategories', 'level', 'jobType'],
      select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","wanted_gender"]
    });
  }

  async findOne(id: number,companyID: number): Promise<Job[]> {
    return this.jobRepository.find({
      where: { id: id , company: { id: companyID }} , // Filter by company ID,
      relations: ['category', 'subCategories', 'level', 'jobType'],
      select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","wanted_gender"]
    });
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }

}