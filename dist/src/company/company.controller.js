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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const decorate_guards_1 = require("./strategies/decorate-guards");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    uploadLogo(file, req) {
        const id = req.user['id'];
        return this.companyService.saveLogo(file, id);
    }
    findAll(request) {
        const company = request.user;
        const companyId = company['id'];
        return this.companyService.findAll(companyId);
    }
    findOne(id, request) {
        const company = request.user;
        const companyId = company['id'];
        return this.companyService.findOne(+id, companyId);
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.CompanyAtGuard),
    (0, common_1.Post)('upload-logo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploadsImages',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "uploadLogo", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.CompanyAtGuard),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.CompanyAtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "findOne", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map