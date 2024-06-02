import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { Static } from 'src/statics/entities/static.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
export declare class SuperAdminService {
    private employeeRepository;
    private staticRepository;
    private subCategoryRepository;
    constructor(employeeRepository: Repository<Employee>, staticRepository: Repository<Static>, subCategoryRepository: Repository<SubCategory>);
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
    remove(id: number): Promise<{
        statusCode: number;
        message: string;
    }>;
}
