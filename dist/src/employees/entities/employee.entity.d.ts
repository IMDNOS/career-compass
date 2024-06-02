import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { Static } from '../../statics/entities/static.entity';
export declare enum Gender {
    Male = "male",
    Female = "female"
}
export declare class Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    home_address: string;
    birthday_date: Date;
    hashed_password: string;
    hashedRT: string | null;
    active: boolean;
    hashedCode: string | null;
    image: string;
    resume: string;
    gender: Gender;
    static: Static[];
    subcategory: SubCategory[];
}
