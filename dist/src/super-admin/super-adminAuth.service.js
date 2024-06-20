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
exports.SuperAdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const super_admin_entity_1 = require("./entities/super-admin.entity");
let SuperAdminAuthService = class SuperAdminAuthService {
    constructor(superAdminRepository, jwtService) {
        this.superAdminRepository = superAdminRepository;
        this.jwtService = jwtService;
    }
    async login(loginSuperAdminDto) {
        const superAdmin = await this.superAdminRepository.findOne({ where: { email: loginSuperAdminDto.email } });
        if (!superAdmin)
            throw new common_1.ForbiddenException('Email Does not exist');
        const passwordMatches = await bcrypt.compare(loginSuperAdminDto.password, superAdmin.hashed_password);
        if (passwordMatches) {
            const AccessToken = await this.getToken(superAdmin);
            return AccessToken;
        }
        throw new common_1.ForbiddenException('Wrong Password');
    }
    async createAdmin(createSuperAdminDto) {
        const superAdminCheck = await this.superAdminRepository.findOne({ where: { email: createSuperAdminDto.email } });
        if (superAdminCheck) {
            throw new common_1.HttpException('user already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await this.hashData(createSuperAdminDto.password);
        const admin = this.superAdminRepository.create({
            email: createSuperAdminDto.email,
            hashed_password: hashedPassword,
        });
        return await this.superAdminRepository.save(admin);
    }
    async getToken(superAdmin) {
        const [at] = await Promise.all([
            this.jwtService.signAsync({
                id: superAdmin.id,
                email: superAdmin.email,
            }, {
                secret: 'super-admin',
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        return {
            access_token: at,
        };
    }
    async hashData(data) {
        return bcrypt.hash(data, 10);
    }
};
exports.SuperAdminAuthService = SuperAdminAuthService;
exports.SuperAdminAuthService = SuperAdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(super_admin_entity_1.SuperAdmin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], SuperAdminAuthService);
//# sourceMappingURL=super-adminAuth.service.js.map