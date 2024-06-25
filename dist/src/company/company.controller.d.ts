/// <reference types="multer" />
import { CompanyService } from './company.service';
import { Request } from 'express';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    uploadLogo(file: Express.Multer.File, req: Request): Promise<{
        id: number;
        company_name: string;
        email: string;
        phone: string;
        hashed_password: string;
        hashedRT: string;
        hashedCode: string;
        address: string;
        description: string;
        logo: string;
        premiumLevel: number;
        active: boolean;
    }>;
    findAll(request: Request): Promise<import("../job/entities/job.entity").Job[]>;
    findOne(id: string, request: Request): Promise<import("../job/entities/job.entity").Job[]>;
}
