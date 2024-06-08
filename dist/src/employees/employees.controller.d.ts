/// <reference types="multer" />
import { Request } from 'express';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    getInfo(req: Request): Promise<import("./entities/employee.entity").Employee>;
    update(updateEmployeeDto: UpdateEmployeeDto, req: Request): Promise<import("./entities/employee.entity").Employee | {
        message: string;
    }>;
    setStatics(staticsDto: {
        name: string;
    }[], req: Request): Promise<import("../statics/entities/static.entity").Static[]>;
    getStatics(req: Request): Promise<{
        levels: import("../statics/entities/static.entity").Static[];
        jobTypes: import("../statics/entities/static.entity").Static[];
        categories: import("../statics/entities/static.entity").Static[];
    }>;
    setSubcategories(subcategoriesDto: {
        name: string;
    }[], req: Request): Promise<import("../sub-categories/entities/sub-category.entity").SubCategory[]>;
    getSubcategories(req: Request): Promise<import("../sub-categories/entities/sub-category.entity").SubCategory[]>;
    uploadImage(file: Express.Multer.File, req: Request): Promise<{
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
        description: string;
        image: string;
        resume: string;
        gender: import("./entities/employee.entity").Gender;
        static: import("../statics/entities/static.entity").Static[];
        subcategory: import("../sub-categories/entities/sub-category.entity").SubCategory[];
    }>;
    uploadFile(file: Express.Multer.File, req: Request): Promise<{
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
        description: string;
        image: string;
        resume: string;
        gender: import("./entities/employee.entity").Gender;
        static: import("../statics/entities/static.entity").Static[];
        subcategory: import("../sub-categories/entities/sub-category.entity").SubCategory[];
    }>;
}
