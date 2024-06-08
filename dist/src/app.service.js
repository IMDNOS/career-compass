"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const static_entity_1 = require("./statics/entities/static.entity");
const typeorm_2 = require("typeorm");
const sub_category_entity_1 = require("./sub-categories/entities/sub-category.entity");
const super_admin_entity_1 = require("./super-admin/entities/super-admin.entity");
let AppService = class AppService {
    constructor(staticRepository, subCategoryRepository, superAdminRepository) {
        this.staticRepository = staticRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.superAdminRepository = superAdminRepository;
    }
    getHello() {
        return 'Hello World!';
    }
    async seed() {
        try {
            {
                {
                    await this.staticRepository.save({
                        name: 'Full Time',
                        type: static_entity_1.Type.Job_type,
                    });
                    await this.staticRepository.save({
                        name: 'Part Time',
                        type: static_entity_1.Type.Job_type,
                    });
                    await this.staticRepository.save({
                        name: 'Freelance',
                        type: static_entity_1.Type.Job_type,
                    });
                    await this.staticRepository.save({
                        name: 'Work From Home',
                        type: static_entity_1.Type.Job_type,
                    });
                }
                {
                    await this.staticRepository.save({
                        name: 'Junior',
                        type: static_entity_1.Type.Level,
                    });
                    await this.staticRepository.save({
                        name: 'Senior',
                        type: static_entity_1.Type.Level,
                    });
                    await this.staticRepository.save({
                        name: 'Student',
                        type: static_entity_1.Type.Level,
                    });
                }
                {
                    await this.staticRepository.save({
                        name: 'ITE',
                        type: static_entity_1.Type.Category,
                    });
                    await this.staticRepository.save({
                        name: 'Banking',
                        type: static_entity_1.Type.Category,
                    });
                    await this.staticRepository.save({
                        name: 'Graphic Design',
                        type: static_entity_1.Type.Category,
                    });
                    await this.staticRepository.save({
                        name: 'Education',
                        type: static_entity_1.Type.Category,
                    });
                }
            }
            {
                const ITE = await this.staticRepository.findOne({ where: { name: 'ITE' } });
                await this.subCategoryRepository.save({
                    name: 'Java',
                    category: ITE,
                });
                await this.subCategoryRepository.save({
                    name: 'Laravel',
                    category: ITE,
                });
                await this.subCategoryRepository.save({
                    name: 'nestJs',
                    category: ITE,
                });
            }
            {
                await this.superAdminRepository.save({
                    email: 'superAdmin@gmail.com',
                    hashed_password: '$2b$10$s8lDzeYEqVX9ytw7FMl5re92OGzhXhuUE/fjJBJJOuvOvXP2rr8ta',
                    active: true,
                    manager: true,
                });
            }
        }
        catch {
            return 'already seeded';
        }
        return 'seeded successfully';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(static_entity_1.Static)),
    __param(1, (0, typeorm_1.InjectRepository)(sub_category_entity_1.SubCategory)),
    __param(2, (0, typeorm_1.InjectRepository)(super_admin_entity_1.SuperAdmin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map