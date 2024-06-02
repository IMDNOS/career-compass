import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { Company } from '../../company/entities/company.entity';
import { Static } from '../../statics/entities/static.entity';
export declare enum Gender {
    Male = "male",
    Female = "female"
}
export declare class Job {
    id: number;
    title: string;
    company: Company;
    description: string;
    salary: number;
    work_hours: number;
    experience_years: number;
    wanted_gender: Gender;
    category: Static;
    subCategories: SubCategory[];
    jobType: Static;
    level: Static;
}
