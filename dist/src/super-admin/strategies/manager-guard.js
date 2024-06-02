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
exports.ManagerGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const super_admin_entity_1 = require("../entities/super-admin.entity");
const typeorm_2 = require("typeorm");
let ManagerGuard = class ManagerGuard {
    constructor(superAdminRepository) {
        this.superAdminRepository = superAdminRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const admin_id = request.user['id'];
        const admin = await this.superAdminRepository.findOne({ where: { id: admin_id } });
        return admin.manager;
    }
};
exports.ManagerGuard = ManagerGuard;
exports.ManagerGuard = ManagerGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(super_admin_entity_1.SuperAdmin)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ManagerGuard);
//# sourceMappingURL=manager-guard.js.map