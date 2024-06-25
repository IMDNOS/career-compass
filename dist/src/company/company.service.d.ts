/// <reference types="multer" />
import { Job } from '../job/entities/job.entity';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
export declare class CompanyService {
    private companyRepository;
    private jobRepository;
    constructor(companyRepository: Repository<Company>, jobRepository: Repository<Job>);
    saveLogo(file: Express.Multer.File, companyId: number): Promise<{
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
    findAll(companyID: number): Promise<Job[]>;
    findOne(id: number, companyID: number): Promise<Job[]>;
}
