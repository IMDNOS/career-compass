import { Category } from '../../categories/entities/category.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { Type } from '../../types/entities/type.entity';
import { Level } from '../../levels/entities/level.entity';
export declare enum WorkTime {
    PartTime = "part time",
    FullTime = "full time",
    FromHome = "from home"
}
export declare enum Gender {
    Male = "male",
    Female = "female"
}
export declare class Job {
    id: number;
    title: string;
    location: string;
    description: string;
    salary: number;
    experience_years: string | null;
    image: string;
    resume: string;
    work_time: WorkTime;
    wanted_gender: Gender;
    categoryId: number;
    category: Category;
    subCategoryId: number;
    subCategory: SubCategory;
    typeId: number;
    type: Type;
    levelId: number;
    level: Level;
}
