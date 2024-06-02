import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
export declare enum Type {
    Category = "category",
    Job_type = "job type",
    Level = "level"
}
export declare class Static {
    id: number;
    name: string;
    type: Type;
    subCategories: SubCategory[];
}
