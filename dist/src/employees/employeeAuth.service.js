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
exports.EmployeeAuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let EmployeeAuthService = class EmployeeAuthService {
    constructor(employeeRepository, jwtService) {
        this.employeeRepository = employeeRepository;
        this.jwtService = jwtService;
    }
    async register(createEmployeeDto) {
        const hashedPassword = await this.hashData(createEmployeeDto.password);
        const employee = this.employeeRepository.create({
            name: createEmployeeDto.name,
            email: createEmployeeDto.email,
            hashed_password: hashedPassword,
            gender: createEmployeeDto.gender,
        });
        await this.employeeRepository.save(employee);
        const tokens = await this.getTokens(employee);
        await this.updateRefreshToken(employee.id, tokens.refresh_token);
        return tokens;
    }
    async login(loginEmployeeDto) {
        const employee = await this.employeeRepository.findOne({ where: { email: loginEmployeeDto.email } });
        if (!employee)
            throw new common_1.ForbiddenException('Email Does not exist');
        const passwordMatches = await bcrypt.compare(loginEmployeeDto.password, employee.hashed_password);
        if (passwordMatches) {
            const tokens = await this.getTokens(employee);
            await this.updateRefreshToken(employee.id, tokens.refresh_token);
            return tokens;
        }
        throw new common_1.ForbiddenException('Wrong Password');
    }
    async logout(employee_id) {
        await this.employeeRepository.update({
            id: employee_id,
        }, { hashedRT: null });
        return { 'message': 'refresh token deleted successfully' };
    }
    async refreshTokens(employee_id, rt) {
        const employee = await this.employeeRepository.findOne({
            where: {
                id: employee_id,
            },
        });
        if (!employee)
            throw new common_1.ForbiddenException('Access Denied');
        const rtMatches = await bcrypt.compare(rt, employee.hashedRT);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(employee);
        await this.updateRefreshToken(employee.id, tokens.refresh_token);
        return tokens;
    }
    async hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async getTokens(employee) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                id: employee.id,
                name: employee.name,
                email: employee.email,
                gender: employee.gender,
            }, {
                secret: 'employee_at_secret',
                expiresIn: 60 * 60 * 24 * 7,
            }),
            this.jwtService.signAsync({
                id: employee.id,
                name: employee.name,
                email: employee.email,
                gender: employee.gender,
            }, {
                secret: 'employee_rt_secret',
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async updateRefreshToken(user_id, rt) {
        const hash = await this.hashData(rt);
        const newData = {
            hashedRT: hash,
        };
        await this.employeeRepository.update({ id: user_id }, newData);
    }
};
exports.EmployeeAuthService = EmployeeAuthService;
exports.EmployeeAuthService = EmployeeAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], EmployeeAuthService);
//# sourceMappingURL=employeeAuth.service.js.map