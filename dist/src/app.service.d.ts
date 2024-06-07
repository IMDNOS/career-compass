import { Static } from './statics/entities/static.entity';
import { Repository } from 'typeorm';
import { SubCategory } from './sub-categories/entities/sub-category.entity';
import { SuperAdmin } from './super-admin/entities/super-admin.entity';
export declare class AppService {
    private staticRepository;
    private subCategoryRepository;
    private superAdminRepository;
    constructor(staticRepository: Repository<Static>, subCategoryRepository: Repository<SubCategory>, superAdminRepository: Repository<SuperAdmin>);
    getHello(): string;
    seed(): Promise<"already seeded" | "seeded successfully">;
}
