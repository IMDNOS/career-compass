"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticsModule = void 0;
const common_1 = require("@nestjs/common");
const statics_service_1 = require("./statics.service");
const statics_controller_1 = require("./statics.controller");
const typeorm_1 = require("@nestjs/typeorm");
const static_entity_1 = require("./entities/static.entity");
const sub_category_entity_1 = require("../sub-categories/entities/sub-category.entity");
let StaticsModule = class StaticsModule {
};
exports.StaticsModule = StaticsModule;
exports.StaticsModule = StaticsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([static_entity_1.Static, sub_category_entity_1.SubCategory])],
        controllers: [statics_controller_1.StaticsController],
        providers: [statics_service_1.StaticsService],
    })
], StaticsModule);
//# sourceMappingURL=statics.module.js.map