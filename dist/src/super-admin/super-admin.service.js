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
exports.SuperAdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("../employees/entities/employee.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let SuperAdminService = class SuperAdminService {
    constructor(employeeRepository, jwtService) {
        this.employeeRepository = employeeRepository;
        this.jwtService = jwtService;
    }
    async login(loginsuperadmindto) {
        const superAdmin = await this.employeeRepository.findOne({ where: { email: loginsuperadmindto.email } });
        if (!superAdmin)
            throw new common_1.ForbiddenException('Email Does not exist');
        const passwordMatches = await bcrypt.compare(loginsuperadmindto.password, superAdmin.hashed_password);
        if (passwordMatches) {
            const tokens = await this.getTokens(superAdmin);
            await this.updateAccessToken(superAdmin.id, tokens.access_token);
            return tokens;
        }
        throw new common_1.ForbiddenException('Wrong Password');
    }
    async getTokens(superAdmin) {
        const [at] = await Promise.all([
            this.jwtService.signAsync({
                id: superAdmin.id,
                name: superAdmin.name,
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
    async updateAccessToken(id, at) {
        const hash = await this.hashData(at);
        const newData = {
            hashed_password: hash,
        };
        await this.employeeRepository.update({ id: id }, newData);
    }
    async findAll() {
        return await this.employeeRepository.find({
            relations: {
                category: true,
                subCategory: true
            },
            select: ["id", "name", "email", "image", "resume", "gender"]
        });
    }
    async findOne(id) {
        const user = await this.employeeRepository.findOne({
            where: {
                id
            },
            relations: {
                category: true,
                subCategory: true
            },
            select: ["id", "name", "email", "image", "resume", "gender"]
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found ');
        }
        return user;
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], SuperAdminService);
//# sourceMappingURL=super-admin.service.js.map