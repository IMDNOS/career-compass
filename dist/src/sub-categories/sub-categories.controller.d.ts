import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
export declare class SubCategoriesController {
    private readonly subCategoriesService;
    constructor(subCategoriesService: SubCategoriesService);
    create(createSubCategoryDto: CreateSubCategoryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSubCategoryDto: UpdateSubCategoryDto): string;
    remove(id: string): string;
}
