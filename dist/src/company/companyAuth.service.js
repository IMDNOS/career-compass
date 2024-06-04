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
exports.CompanyAuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("./entities/company.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let CompanyAuthService = class CompanyAuthService {
    constructor(companyRepository, jwtService) {
        this.companyRepository = companyRepository;
        this.jwtService = jwtService;
    }
    async register(createCompanyDto) {
        const hashedPassword = await this.hashData(createCompanyDto.password);
        const company = this.companyRepository.create({
            company_name: createCompanyDto.company_name,
            email: createCompanyDto.email,
            phone: createCompanyDto.phone,
            hashed_password: hashedPassword,
            address: createCompanyDto.address,
            description: createCompanyDto.description
        });
        await this.companyRepository.save(company);
        return this.requestActivationCode({ email: createCompanyDto.email });
    }
    async requestActivationCode(requestActivationCodeDto) {
        const company = await this.companyRepository.findOne({ where: { email: requestActivationCodeDto.email } });
        if (company) {
            if (!company.active) {
                const newCode = this.generateRandomCode();
                const newHash = this.hashData(newCode);
                company.hashedCode = await newHash;
                await this.companyRepository.update(company.id, company);
                return newCode;
            }
            else {
                return await this.getTokens(company);
            }
        }
        else {
            throw new common_1.HttpException('Email does not exists', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async activateAccount(activateCompanyDto) {
        const company = await this.companyRepository.findOne({ where: { email: activateCompanyDto.email } });
        if (!company)
            throw new common_1.ForbiddenException('Email Does not exist');
        const codeMatches = await bcrypt.compare(activateCompanyDto.activationCode, company.hashedCode);
        company.active = true;
        await this.companyRepository.update(company.id, company);
        if (codeMatches) {
            const tokens = await this.getTokens(company);
            await this.updateRefreshToken(company.id, tokens.refresh_token);
            return tokens;
        }
        throw new common_1.ForbiddenException('Wrong Code');
    }
    async login(loginCompanyDto) {
        const company = await this.companyRepository.findOne({ where: { email: loginCompanyDto.email } });
        if (!company)
            throw new common_1.ForbiddenException('Email Does not exist');
        const passwordMatches = await bcrypt.compare(loginCompanyDto.password, company.hashed_password);
        if (passwordMatches) {
            const tokens = await this.getTokens(company);
            await this.updateRefreshToken(company.id, tokens.refresh_token);
            return tokens;
        }
        throw new common_1.ForbiddenException('Wrong Password');
    }
    async logout(company_id) {
        await this.companyRepository.update({
            id: company_id,
        }, { hashedRT: null });
        return { 'message': 'refresh token deleted successfully' };
    }
    async refreshTokens(company_id, rt) {
        const company = await this.companyRepository.findOne({
            where: {
                id: company_id,
            },
        });
        if (!company)
            throw new common_1.ForbiddenException('Access Denied');
        const rtMatches = await bcrypt.compare(rt, company.hashedRT);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(company);
        await this.updateRefreshToken(company.id, tokens.refresh_token);
        return tokens;
    }
    async hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async getTokens(company) {
        if (!company.active)
            throw new common_1.HttpException('account is not activated', common_1.HttpStatus.UNAUTHORIZED);
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                id: company.id,
                company_name: company.company_name,
                email: company.email,
            }, {
                secret: 'company_at_secret',
                expiresIn: 60 * 60 * 24 * 7,
            }),
            this.jwtService.signAsync({
                id: company.id,
                company_name: company.company_name,
                email: company.email,
            }, {
                secret: 'company_rt_secret',
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
        await this.companyRepository.update({ id: user_id }, newData);
    }
    generateRandomCode() {
        return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
    }
};
exports.CompanyAuthService = CompanyAuthService;
exports.CompanyAuthService = CompanyAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], CompanyAuthService);
//# sourceMappingURL=companyAuth.service.js.map