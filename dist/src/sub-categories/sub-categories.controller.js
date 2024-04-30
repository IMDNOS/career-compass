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
exports.SubCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const sub_categories_service_1 = require("./sub-categories.service");
const create_sub_category_dto_1 = require("./dto/create-sub-category.dto");
const update_sub_category_dto_1 = require("./dto/update-sub-category.dto");
let SubCategoriesController = class SubCategoriesController {
    constructor(subCategoriesService) {
        this.subCategoriesService = subCategoriesService;
    }
    create(createSubCategoryDto) {
        return this.subCategoriesService.create(createSubCategoryDto);
    }
    findAll() {
        return this.subCategoriesService.findAll();
    }
    findOne(id) {
        return this.subCategoriesService.findOne(+id);
    }
    update(id, updateSubCategoryDto) {
        return this.subCategoriesService.update(+id, updateSubCategoryDto);
    }
    remove(id) {
        return this.subCategoriesService.remove(+id);
    }
};
exports.SubCategoriesController = SubCategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_category_dto_1.CreateSubCategoryDto]),
    __metadata("design:returntype", void 0)
], SubCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sub_category_dto_1.UpdateSubCategoryDto]),
    __metadata("design:returntype", void 0)
], SubCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubCategoriesController.prototype, "remove", null);
exports.SubCategoriesController = SubCategoriesController = __decorate([
    (0, common_1.Controller)('sub-categories'),
    __metadata("design:paramtypes", [sub_categories_service_1.SubCategoriesService])
], SubCategoriesController);
//# sourceMappingURL=sub-categories.controller.js.map