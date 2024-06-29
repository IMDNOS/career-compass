import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { Static } from 'src/statics/entities/static.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { Job } from '../job/entities/job.entity';
import { ActivateJobDto } from './dto/update-super-admin.dto';
export declare class SuperAdminService {
    private employeeRepository;
    private staticRepository;
    private subCategoryRepository;
    private jobRepository;
    constructor(employeeRepository: Repository<Employee>, staticRepository: Repository<Static>, subCategoryRepository: Repository<SubCategory>, jobRepository: Repository<Job>);
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        gender: import("../employees/entities/employee.entity").Gender;
        image: string;
        resume: string;
        levels: Static[];
        jobTypes: Static[];
        categories: Static[];
        SubCategory: SubCategory[];
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        gender: import("../employees/entities/employee.entity").Gender;
        image: string;
        resume: string;
        levels: Static[];
        jobTypes: Static[];
        categories: Static[];
        SubCategory: SubCategory[];
    }[]>;
    jobs(fields?: any): Promise<Job[]>;
    remove(id: number): Promise<{
        statusCode: number;
        message: string;
    }>;
    activateJob(activateJobDto: ActivateJobDto): Promise<string>;
}
