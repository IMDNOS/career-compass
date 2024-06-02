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
exports.SuperAdminAuthController = void 0;
const common_1 = require("@nestjs/common");
const super_adminAuth_service_1 = require("./super-adminAuth.service");
const login_super_admin_dto_1 = require("./dto/login-super-admin.dto");
const create_super_admin_dto_1 = require("./dto/create-super-admin.dto");
const decorate_guards_1 = require("./strategies/decorate-guards");
const manager_guard_1 = require("./strategies/manager-guard");
const activate_super_admin_1 = require("./dto/activate-super-admin");
let SuperAdminAuthController = class SuperAdminAuthController {
    constructor(superAdminAuthService) {
        this.superAdminAuthService = superAdminAuthService;
    }
    register(createSuperAdminDto) {
        return this.superAdminAuthService.register(createSuperAdminDto);
    }
    login(loginSuperAdminDto) {
        return this.superAdminAuthService.login(loginSuperAdminDto);
    }
    activate(activateSuperAdmin) {
        return this.superAdminAuthService.activate(activateSuperAdmin);
    }
    makeManager(makeManagerDto) {
        return this.superAdminAuthService.makeManager(makeManagerDto);
    }
};
exports.SuperAdminAuthController = SuperAdminAuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_super_admin_dto_1.CreateSuperAdminDto]),
    __metadata("design:returntype", void 0)
], SuperAdminAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_super_admin_dto_1.LoginSuperAdminDto]),
    __metadata("design:returntype", void 0)
], SuperAdminAuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.AtGuardSuperAdmin, manager_guard_1.ManagerGuard),
    (0, common_1.Post)('activate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [activate_super_admin_1.ActivateSuperAdmin]),
    __metadata("design:returntype", void 0)
], SuperAdminAuthController.prototype, "activate", null);
__decorate([
    (0, common_1.UseGuards)(decorate_guards_1.AtGuardSuperAdmin, manager_guard_1.ManagerGuard),
    (0, common_1.Post)('make_manager'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [activate_super_admin_1.MakeManagerDto]),
    __metadata("design:returntype", void 0)
], SuperAdminAuthController.prototype, "makeManager", null);
exports.SuperAdminAuthController = SuperAdminAuthController = __decorate([
    (0, common_1.Controller)('superAdminAuth'),
    __metadata("design:paramtypes", [super_adminAuth_service_1.SuperAdminAuthService])
], SuperAdminAuthController);
//# sourceMappingURL=super-adminAuth.controller.js.map