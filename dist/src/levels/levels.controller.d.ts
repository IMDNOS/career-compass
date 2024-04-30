import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
export declare class LevelsController {
    private readonly levelsService;
    constructor(levelsService: LevelsService);
    create(createLevelDto: CreateLevelDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLevelDto: UpdateLevelDto): string;
    remove(id: string): string;
}
