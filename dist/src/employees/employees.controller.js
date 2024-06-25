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
exports.EmployeesController = void 0;
const update_employee_dto_1 = require("./dto/update-employee.dto");
const decorate_guards_1 = require("./strategies/decorate-guards");
const employees_service_1 = require("./employees.service");
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const set_education_and_experience_dto_1 = require("./dto/set-education-and-experience.dto");
let EmployeesController = class EmployeesController {
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    getInfo(req) {
        const id = req.user['id'];
        return this.employeesService.getInfo(id);
    }
    update(updateEmployeeDto, req) {
        const id = req.user['id'];
        return this.employeesService.update(updateEmployeeDto, id);
    }
    setStatics(staticsDto, req) {
        const id = req.user['id'];
        return this.employeesService.setStatics(id, staticsDto);
    }
    getStatics(req) {
        const id = req.user['id'];
        return this.employeesService.getStatics(id);
    }
    setSubcategories(subcategoriesDto, req) {
        const id = req.user['id'];
        return this.employeesService.setSubcategories(id, subcategoriesDto);
    }
    getSubcategories(req) {
        const id = req.user['id'];
        return this.employeesService.getSubcategories(id);
    }
    setEducationAndExperience(setEducationAndExperienceDto, req) {
        const id = req.user['id'];
        return this.employeesService.setEducationAndExperience(id, setEducationAndExperienceDto);
    }
    uploadImage(file, req) {
        const id = req.user['id'];
        return this.employeesService.saveImage(file, id);
    }
    uploadFile(file, req) {
        const id = req.user['id'];
        return this.employeesService.saveFile(file, id);
    }
    jobs(fields) {
        return this.employeesService.jobs(fields);
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Get)('get_info'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "getInfo", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_employee_dto_1.UpdateEmployeeDto, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Post)('set_statics'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "setStatics", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Get)('get_statics'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "getStatics", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Post)('set_subcategories'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "setSubcategories", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Get)('get_subcategories'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "getSubcategories", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Post)('set_education&experience'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_education_and_experience_dto_1.SetEducationAndExperienceDto, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "setEducationAndExperience", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploadsImages',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.EmployeeAtGuard),
    (0, common_1.Post)('upload-file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploadsFiles',
            filename: (req, file, cb) => {
                const randomName = Array(34)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('jobs'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "jobs", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map