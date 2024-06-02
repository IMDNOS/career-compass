import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
export declare class SubCategoriesController {
    private readonly subCategoriesService;
    constructor(subCategoriesService: SubCategoriesService);
    create(createSubCategoryDto: CreateSubCategoryDto): Promise<import("./entities/sub-category.entity").SubCategory>;
    findAll(): Promise<import("./entities/sub-category.entity").SubCategory[]>;
    findOne(id: string): Promise<import("./entities/sub-category.entity").SubCategory>;
    update(id: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<import("./entities/sub-category.entity").SubCategory>;
    remove(id: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
