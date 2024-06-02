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
exports.SubCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sub_category_entity_1 = require("./entities/sub-category.entity");
const static_entity_1 = require("../statics/entities/static.entity");
let SubCategoriesService = class SubCategoriesService {
    constructor(subCategoryRepository, staticRepository) {
        this.subCategoryRepository = subCategoryRepository;
        this.staticRepository = staticRepository;
    }
    async create(createSubCategoryDto) {
        const id_category = createSubCategoryDto.categoryId;
        const category = await this.staticRepository.findOne({ where: {
                id: +id_category,
                type: static_entity_1.Type.Category
            } });
        if (!category) {
            throw new common_1.HttpException(`Category with id ${id_category} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const subcategory = this.subCategoryRepository.create({
            name: createSubCategoryDto.name,
            category: category,
        });
        try {
            return await this.subCategoryRepository.save(subcategory);
        }
        catch {
            throw new common_1.HttpException('Duplicate subcategory name', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        return await this.subCategoryRepository.find({ relations: ['category'] });
    }
    async findOne(id) {
        return await this.subCategoryRepository.findOne({ where: { id: id }, relations: ['category'] });
    }
    async update(id, updateSubCategoryDto) {
        const subcategory = await this.subCategoryRepository.findOne({ where: { id: id }, relations: ['category'] });
        if (!subcategory) {
            throw new common_1.HttpException(`Subcategory with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const category = await this.staticRepository.findOne({ where: { id: +updateSubCategoryDto.categoryId } });
        if (!category) {
            throw new common_1.HttpException(`Category with id ${updateSubCategoryDto.categoryId} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        subcategory.name = updateSubCategoryDto.name;
        subcategory.category = category;
        try {
            return await this.subCategoryRepository.save(subcategory);
        }
        catch {
            throw new common_1.HttpException('Duplicate subcategory name', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        const subcategory = await this.subCategoryRepository.findOne({ where: { id: id } });
        if (!subcategory) {
            throw new common_1.HttpException(`Subcategory with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.subCategoryRepository.remove(subcategory);
        return {
            statusCode: 200,
            message: `SubCategory with id ${id} has been successfully removed`,
        };
    }
};
exports.SubCategoriesService = SubCategoriesService;
exports.SubCategoriesService = SubCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sub_category_entity_1.SubCategory)),
    __param(1, (0, typeorm_1.InjectRepository)(static_entity_1.Static)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubCategoriesService);
//# sourceMappingURL=sub-categories.service.js.map