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
exports.EmployeeAuthController = void 0;
const common_1 = require("@nestjs/common");
const employeeAuth_service_1 = require("./employeeAuth.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const login_employee_dto_1 = require("./dto/login-employee.dto");
const passport_1 = require("@nestjs/passport");
const decorate_guards_1 = require("./strategies/decorate-guards");
let EmployeeAuthController = class EmployeeAuthController {
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    register(createEmployeeDto) {
        return this.employeesService.register(createEmployeeDto);
    }
    login(loginEmployeeDto) {
        return this.employeesService.login(loginEmployeeDto);
    }
    async logout(req) {
        const employee = req.user;
        return this.employeesService.logout(employee['id']);
    }
    refreshTokens(req) {
        const employee = req.user;
        return this.employeesService.refreshTokens(employee['id'], employee['refreshToken']);
    }
};
exports.EmployeeAuthController = EmployeeAuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_employee_dto_1.LoginEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeeAuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.AtGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeAuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-refresh')),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeAuthController.prototype, "refreshTokens", null);
exports.EmployeeAuthController = EmployeeAuthController = __decorate([
    (0, common_1.Controller)('employeeAuth'),
    __metadata("design:paramtypes", [employeeAuth_service_1.EmployeeAuthService])
], EmployeeAuthController);
//# sourceMappingURL=employeeAuth.controller.js.map