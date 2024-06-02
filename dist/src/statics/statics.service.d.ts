import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';
import { Repository } from 'typeorm';
import { Static } from './entities/static.entity';
export declare class StaticsService {
    private staticRepository;
    constructor(staticRepository: Repository<Static>);
    create(createStaticDto: CreateStaticDto): Promise<CreateStaticDto & Static>;
    findAllStatics(): Promise<{
        levels: Static[];
        jobTypes: Static[];
        categories: Static[];
    }>;
    findOne(id: number): Promise<Static>;
    update(id: number, updateStaticDto: UpdateStaticDto): Promise<Static>;
    remove(id: number): Promise<{
        statusCode: number;
        message: string;
    }>;
    getSubcategoriesOfCategory(categoryId: number): Promise<{
        id: number;
        name: string;
        categoryId: number;
    }[]>;
}
