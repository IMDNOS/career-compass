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
exports.CompanyAuthController = void 0;
const common_1 = require("@nestjs/common");
const companyAuth_service_1 = require("./companyAuth.service");
const create_company_dto_1 = require("./dto/create-company.dto");
const login_company_dto_1 = require("./dto/login-company.dto");
const decorate_guards_1 = require("./strategies/decorate-guards");
let CompanyAuthController = class CompanyAuthController {
    constructor(companyAuthService) {
        this.companyAuthService = companyAuthService;
    }
    register(createCompanyDto) {
        return this.companyAuthService.register(createCompanyDto);
    }
    login(loginCompanyDto) {
        return this.companyAuthService.login(loginCompanyDto);
    }
    async logout(req) {
        const company = req.user;
        return this.companyAuthService.logout(company['id']);
    }
    refreshTokens(req) {
        const company = req.user;
        return this.companyAuthService.refreshTokens(company['id'], company['refreshToken']);
    }
};
exports.CompanyAuthController = CompanyAuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", void 0)
], CompanyAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_company_dto_1.LoginCompanyDto]),
    __metadata("design:returntype", void 0)
], CompanyAuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.CompanyAtGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyAuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.CompanyRtGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CompanyAuthController.prototype, "refreshTokens", null);
exports.CompanyAuthController = CompanyAuthController = __decorate([
    (0, common_1.Controller)('companyAuth'),
    __metadata("design:paramtypes", [companyAuth_service_1.CompanyAuthService])
], CompanyAuthController);
//# sourceMappingURL=companyAuth.controller.js.map