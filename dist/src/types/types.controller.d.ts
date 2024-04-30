import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
export declare class TypesController {
    private readonly typesService;
    constructor(typesService: TypesService);
    create(createTypeDto: CreateTypeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTypeDto: UpdateTypeDto): string;
    remove(id: string): string;
}
