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
exports.StaticsController = void 0;
const common_1 = require("@nestjs/common");
const statics_service_1 = require("./statics.service");
const create_static_dto_1 = require("./dto/create-static.dto");
const decorate_guards_1 = require("../super-admin/strategies/decorate-guards");
const update_static_dto_1 = require("./dto/update-static.dto");
let StaticsController = class StaticsController {
    constructor(staticsService) {
        this.staticsService = staticsService;
    }
    create(createStaticDto) {
        return this.staticsService.create(createStaticDto);
    }
    findOne(id) {
        return this.staticsService.findOne(+id);
    }
    async getAllStatics() {
        return this.staticsService.findAllStatics();
    }
    async getSubcategoriesOfCategory(id) {
        return this.staticsService.getSubcategoriesOfCategory(+id);
    }
    update(id, updateStaticDto) {
        return this.staticsService.update(+id, updateStaticDto);
    }
    remove(id) {
        return this.staticsService.remove(+id);
    }
};
exports.StaticsController = StaticsController;
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.AtGuardSuperAdmin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_static_dto_1.CreateStaticDto]),
    __metadata("design:returntype", void 0)
], StaticsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaticsController.prototype, "getAllStatics", null);
__decorate([
    (0, common_1.Get)('get_subcategories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaticsController.prototype, "getSubcategoriesOfCategory", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.AtGuardSuperAdmin),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_static_dto_1.UpdateStaticDto]),
    __metadata("design:returntype", void 0)
], StaticsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.AtGuardSuperAdmin),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticsController.prototype, "remove", null);
exports.StaticsController = StaticsController = __decorate([
    (0, common_1.Controller)('statics'),
    __metadata("design:paramtypes", [statics_service_1.StaticsService])
], StaticsController);
//# sourceMappingURL=statics.controller.js.map