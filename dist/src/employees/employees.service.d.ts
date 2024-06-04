/// <reference types="multer" />
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Static } from '../statics/entities/static.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
export declare class EmployeesService {
    private employeeRepository;
    private readonly staticRepository;
    private readonly subCategoryRepository;
    constructor(employeeRepository: Repository<Employee>, staticRepository: Repository<Static>, subCategoryRepository: Repository<SubCategory>);
    getInfo(employee_id: number): Promise<Employee>;
    update(updateEmployeeDto: UpdateEmployeeDto, employeeId: number): Promise<Employee | {
        message: string;
    }>;
    setStatics(employeeId: number, staticsDto: {
        name: string;
    }[]): Promise<Static[]>;
    getStatics(employeeId: number): Promise<{
        levels: Static[];
        jobTypes: Static[];
        categories: Static[];
    }>;
    setSubcategories(employeeId: number, subcategoriesDto: {
        name: string;
    }[]): Promise<SubCategory[]>;
    getSubcategories(employeeId: number): Promise<SubCategory[]>;
    saveImage(file: Express.Multer.File, employeeId: number): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        home_address: string;
        birthday_date: Date;
        hashed_password: string;
        hashedRT: string;
        active: boolean;
        hashedCode: string;
        image: string;
        resume: string;
        gender: import("./entities/employee.entity").Gender;
        static: Static[];
        subcategory: SubCategory[];
    }>;
    saveFile(file: Express.Multer.File, employeeId: number): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        home_address: string;
        birthday_date: Date;
        hashed_password: string;
        hashedRT: string;
        active: boolean;
        hashedCode: string;
        image: string;
        resume: string;
        gender: import("./entities/employee.entity").Gender;
        static: Static[];
        subcategory: SubCategory[];
    }>;
}