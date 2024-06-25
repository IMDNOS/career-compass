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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_entity_1 = require("./entities/job.entity");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../company/entities/company.entity");
const sub_category_entity_1 = require("../sub-categories/entities/sub-category.entity");
const static_entity_1 = require("../statics/entities/static.entity");
let JobService = class JobService {
    constructor(jobRepository, companyRepository, staticRepository, subCategoryRepository) {
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
        this.staticRepository = staticRepository;
        this.subCategoryRepository = subCategoryRepository;
    }
    async create(createJobDto, companyId) {
        const company = await this.companyRepository.findOne({ where: { id: companyId },
            select: ["id", "company_name", "email", "address", "description", "logo", "premiumLevel"] });
        const jobType = await this.staticRepository.findOne({ where: { id: createJobDto.typeId } });
        console.log(jobType);
        const level = await this.staticRepository.findOne({ where: { id: createJobDto.levelId } });
        console.log(level);
        if (!jobType || !level) {
            throw new common_1.NotFoundException(`Job type or level not found`);
        }
        const categories1 = await this.staticRepository.find({
            where: { id: (0, typeorm_2.In)(createJobDto.categoryIds), type: static_entity_1.Type.Category },
        });
        const subCategories = await this.subCategoryRepository.find({
            where: { id: (0, typeorm_2.In)(createJobDto.subCategoryIds) },
            relations: { category: true },
        });
        const uniqueCategories = this.getUniqueStaticEntities(categories1, subCategories);
        const job = this.jobRepository.create({
            company: company,
            description: createJobDto.description,
            experience_years: createJobDto.experience_years,
            salary: createJobDto.salary,
            subCategories: subCategories,
            title: createJobDto.title,
            wanted_gender: createJobDto.wanted_gender,
            number_of_employees: createJobDto.number_of_employees,
            work_hours: createJobDto.work_hours,
            static: [level, jobType, ...uniqueCategories],
        });
        await this.jobRepository.save(job);
        return job;
    }
    async findAll() {
        return this.jobRepository.find({ where: { active: true },
            relations: ['static', 'subCategories'],
            select: ["id", "title", "company", "description", "salary", "work_hours", "experience_years", "number_of_employees", "wanted_gender"]
        });
    }
    async findOne(id) {
        return await this.jobRepository.find({
            where: { id: id, active: true },
            relations: ['static', 'subCategories'],
            select: ["id", "title", "company", "description", "salary", "work_hours", "experience_years", "number_of_employees", "wanted_gender"]
        });
    }
    getUniqueStaticEntities(categories1, subCategories) {
        const uniqueStaticMap = new Map();
        categories1.forEach(category => uniqueStaticMap.set(category.id, category));
        subCategories.forEach(subCategory => {
            if (subCategory.category) {
                uniqueStaticMap.set(subCategory.category.id, subCategory.category);
            }
        });
        return Array.from(uniqueStaticMap.values());
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(2, (0, typeorm_1.InjectRepository)(static_entity_1.Static)),
    __param(3, (0, typeorm_1.InjectRepository)(sub_category_entity_1.SubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JobService);
//# sourceMappingURL=job.service.js.map