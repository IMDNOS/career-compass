import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Static } from '../statics/entities/static.entity';
export declare class JobService {
    private jobRepository;
    private companyRepository;
    private staticRepository;
    private subCategoryRepository;
    constructor(jobRepository: Repository<Job>, companyRepository: Repository<Company>, staticRepository: Repository<Static>, subCategoryRepository: Repository<SubCategory>);
    create(createJobDto: CreateJobDto, companyId: number): Promise<Job>;
    findAll(): Promise<Job[]>;
    findOne(id: number): Promise<Job[]>;
    getUniqueStaticEntities(categories1: Static[], subCategories: SubCategory[]): Static[];
}
