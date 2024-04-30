import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
export declare class TypesService {
    create(createTypeDto: CreateTypeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTypeDto: UpdateTypeDto): string;
    remove(id: number): string;
}
