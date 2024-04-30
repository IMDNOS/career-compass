import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
export declare class LevelsService {
    create(createLevelDto: CreateLevelDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLevelDto: UpdateLevelDto): string;
    remove(id: number): string;
}
