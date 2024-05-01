import { Category } from '../../categories/entities/category.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
export declare enum Gender {
    Male = "male",
    Female = "female"
}
export declare class Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    hashed_password: string;
    hashedRT: string | null;
    image: string;
    resume: string;
    gender: Gender;
    categoryId: number;
    category: Category;
    subCategoryId: number;
    subCategory: SubCategory;
}
