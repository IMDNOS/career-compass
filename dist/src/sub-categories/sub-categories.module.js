"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const sub_categories_service_1 = require("./sub-categories.service");
const sub_categories_controller_1 = require("./sub-categories.controller");
const typeorm_1 = require("@nestjs/typeorm");
const sub_category_entity_1 = require("./entities/sub-category.entity");
const static_entity_1 = require("../statics/entities/static.entity");
let SubCategoriesModule = class SubCategoriesModule {
};
exports.SubCategoriesModule = SubCategoriesModule;
exports.SubCategoriesModule = SubCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sub_category_entity_1.SubCategory, static_entity_1.Static])],
        controllers: [sub_categories_controller_1.SubCategoriesController],
        providers: [sub_categories_service_1.SubCategoriesService],
    })
], SubCategoriesModule);
//# sourceMappingURL=sub-categories.module.js.map