import { StaticsService } from './statics.service';
import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';
export declare class StaticsController {
    private readonly staticsService;
    constructor(staticsService: StaticsService);
    create(createStaticDto: CreateStaticDto): Promise<CreateStaticDto & import("./entities/static.entity").Static>;
    findOne(id: string): Promise<import("./entities/static.entity").Static>;
    getAllStatics(): Promise<{
        levels: import("./entities/static.entity").Static[];
        jobTypes: import("./entities/static.entity").Static[];
        categories: import("./entities/static.entity").Static[];
    }>;
    getSubcategoriesOfCategory(id: string): Promise<{
        id: number;
        name: string;
        categoryId: number;
    }[]>;
    update(id: string, updateStaticDto: UpdateStaticDto): Promise<import("./entities/static.entity").Static>;
    remove(id: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
