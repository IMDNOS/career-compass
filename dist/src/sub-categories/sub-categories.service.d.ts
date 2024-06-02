import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Repository } from 'typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { Static } from 'src/statics/entities/static.entity';
export declare class SubCategoriesService {
    private subCategoryRepository;
    private staticRepository;
    constructor(subCategoryRepository: Repository<SubCategory>, staticRepository: Repository<Static>);
    create(createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategory>;
    findAll(): Promise<SubCategory[]>;
    findOne(id: number): Promise<SubCategory>;
    update(id: number, updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategory>;
    remove(id: number): Promise<{
        statusCode: number;
        message: string;
    }>;
}
