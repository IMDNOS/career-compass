import { SuperAdminService } from './super-admin.service';
import { ActivateJobDto } from './dto/update-super-admin.dto';
export declare class SuperAdminController {
    private readonly superAdminService;
    constructor(superAdminService: SuperAdminService);
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        gender: import("../employees/entities/employee.entity").Gender;
        image: string;
        resume: string;
        levels: import("../statics/entities/static.entity").Static[];
        jobTypes: import("../statics/entities/static.entity").Static[];
        categories: import("../statics/entities/static.entity").Static[];
        SubCategory: import("../sub-categories/entities/sub-category.entity").SubCategory[];
    }[]>;
    jobs(fields?: any): Promise<import("../job/entities/job.entity").Job[]>;
    findOneJob(id: string): Promise<import("../job/entities/job.entity").Job[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        gender: import("../employees/entities/employee.entity").Gender;
        image: string;
        resume: string;
        levels: import("../statics/entities/static.entity").Static[];
        jobTypes: import("../statics/entities/static.entity").Static[];
        categories: import("../statics/entities/static.entity").Static[];
        SubCategory: import("../sub-categories/entities/sub-category.entity").SubCategory[];
    }[]>;
    activateJob(activateJobDto: ActivateJobDto): Promise<string>;
    remove(id: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
