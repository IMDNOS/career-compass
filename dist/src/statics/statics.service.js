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
exports.StaticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const static_entity_1 = require("./entities/static.entity");
let StaticsService = class StaticsService {
    constructor(staticRepository) {
        this.staticRepository = staticRepository;
    }
    async create(createStaticDto) {
        try {
            return await this.staticRepository.save(createStaticDto);
        }
        catch {
            throw new common_1.HttpException('Duplicate static name', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllStatics() {
        const levels = await this.staticRepository.find({ where: { type: static_entity_1.Type.Level } });
        const jobTypes = await this.staticRepository.find({ where: { type: static_entity_1.Type.Job_type } });
        const categories = await this.staticRepository.find({ where: { type: static_entity_1.Type.Category } });
        return { levels, jobTypes, categories };
    }
    async findOne(id) {
        const Static = await this.staticRepository.findOne({ where: { id: id } });
        if (!Static) {
            throw new common_1.HttpException(`Static with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return Static;
    }
    async update(id, updateStaticDto) {
        const Static = await this.findOne(id);
        Static.name = updateStaticDto.name;
        Static.type = updateStaticDto.type;
        try {
            await this.staticRepository.save(Static);
            return Static;
        }
        catch {
            throw new common_1.HttpException('Duplicate subcategory name', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        const Static = await this.staticRepository.findOne({ where: { id: id } });
        if (!Static) {
            throw new common_1.HttpException(`Static with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.staticRepository.remove(Static);
        return {
            statusCode: 200,
            message: `Static with id ${id} has been successfully removed`,
        };
    }
    async getSubcategoriesOfCategory(categoryId) {
        const category = await this.staticRepository.findOne({ where: { id: categoryId }, relations: ['subCategories'] });
        if (!category) {
            throw new common_1.HttpException(`Category with id ${categoryId} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return category.subCategories.map(subcategory => ({
            id: subcategory.id,
            name: subcategory.name,
            categoryId: category.id,
        }));
    }
    async getSubcategoriesOfCategories(categoriesArray) {
        const categoriesIds = categoriesArray.categories.split(',').map(Number);
        const categories = await this.staticRepository.find({ where: { id: (0, typeorm_2.In)(categoriesIds) }, relations: ['subCategories'] });
        const subcategories = categories.flatMap(category => category.subCategories);
        return subcategories;
    }
};
exports.StaticsService = StaticsService;
exports.StaticsService = StaticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(static_entity_1.Static)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaticsService);
//# sourceMappingURL=statics.service.js.map