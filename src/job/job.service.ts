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



  async create(createJobDto: CreateJobDto, companyId: number) {
    const company = await this.companyRepository.findOne({where: { id: companyId },
      select: ["id", "company_name", "email", "address", "description", "logo", "premiumLevel"]});

    if (!company) {
      throw new NotFoundException(`company not found`);
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

      const uniqueCategories = this.getUniqueStaticEntities(categories1, subCategories);

      const job = this.jobRepository.create({
        company: company,
        description: createJobDto.description,
        experience_years: createJobDto.experience_years,
        salary: createJobDto.salary,
        subCategories: subCategories,
        title: createJobDto.title,
        wanted_gender: createJobDto.wanted_gender,
        number_of_employees: createJobDto.number_of_employees,
        work_hours: createJobDto.work_hours,
        static: [level, jobType, ...uniqueCategories],
      });

      await this.jobRepository.save(job);
      return job;
      // const jj= await this.jobRepository.findOne({where:{id:job.id}})
      // return jj;
    }




  async findAll(): Promise<Job[]> {

    return this.jobRepository.find({ where:{active : true},
      relations: ['static', 'subCategories'],
      select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","number_of_employees" ,"wanted_gender"]
    });
  }

  async findOne(id: number): Promise<Job[]> {
    return await this.jobRepository.find({
      where:{id:id , active : true},
      relations: ['static', 'subCategories'],
      select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","number_of_employees","wanted_gender"]
    });
  }

//private function
  getUniqueStaticEntities(categories1: Static[], subCategories: SubCategory[]) {
    const uniqueStaticMap = new Map<number, Static>();

    categories1.forEach(category => uniqueStaticMap.set(category.id, category));
    subCategories.forEach(subCategory => {
      if (subCategory.category) {
        uniqueStaticMap.set(subCategory.category.id, subCategory.category);
      }
    });
    return Array.from(uniqueStaticMap.values());
  }
  // update(id: number, updateJobDto: UpdateJobDto) {
  //   return `This action updates a #${id} job`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} job`;
  // }

}