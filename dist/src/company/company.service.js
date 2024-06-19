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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const job_entity_1 = require("../job/entities/job.entity");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("./entities/company.entity");
const typeorm_2 = require("typeorm");
let CompanyService = class CompanyService {
    constructor(companyRepository, jobRepository) {
        this.companyRepository = companyRepository;
        this.jobRepository = jobRepository;
    }
    async saveLogo(file, companyId) {
        if (!file) {
            throw new common_1.BadRequestException('File not provided');
        }
        const company = await this.companyRepository.findOne({
            where: { id: companyId },
        });
        if (!company) {
            throw new common_1.NotFoundException(`Employee with ID ${companyId} not found`);
        }
        company.logo = `${file.filename}`;
        await this.companyRepository.save(company);
        return { ...company };
    }
    async findAll(companyID) {
        return this.jobRepository.find({ where: { company: { id: companyID }, active: true },
            relations: ['static', 'subCategories'],
            select: ["id", "title", "company", "description", "salary", "work_hours", "experience_years", "wanted_gender"]
        });
    }
    async findOne(id, companyID) {
        return await this.jobRepository.find({
            where: { id: id, company: { id: companyID }, active: true },
            relations: ['static', 'subCategories'],
            select: ["id", "title", "company", "description", "salary", "work_hours", "experience_years", "wanted_gender"]
        });
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=company.service.js.map