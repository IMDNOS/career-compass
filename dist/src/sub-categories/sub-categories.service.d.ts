import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Repository } from 'typeorm';
import { SubCategory } from './entities/sub-category.entity';
export declare class SubCategoriesService {
    private subCategoryRepository;
    constructor(subCategoryRepository: Repository<SubCategory>);
    create(createSubCategoryDto: CreateSubCategoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSubCategoryDto: UpdateSubCategoryDto): string;
    remove(id: number): string;
}
