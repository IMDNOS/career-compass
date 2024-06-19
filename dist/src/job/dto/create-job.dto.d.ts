import { Gender } from '../entities/job.entity';
import { Company } from '../../company/entities/company.entity';
export declare class CreateJobDto {
    title: string;
    company: Company;
    typeId: number;
    levelId: number;
    categoryIds: number[];
    subCategoryIds: number[];
    description: string | null;
    salary: number | null;
    work_hours: number | null;
    experience_years: number | null;
    number_of_employees: number;
    wanted_gender: Gender | null;
}
