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
const static_entity_1 = require("../statics/entities/static.entity");
const sub_category_entity_1 = require("../sub-categories/entities/sub-category.entity");
const job_entity_1 = require("../job/entities/job.entity");
let SuperAdminService = class SuperAdminService {
    constructor(employeeRepository, staticRepository, subCategoryRepository, jobRepository) {
        this.employeeRepository = employeeRepository;
        this.staticRepository = staticRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.jobRepository = jobRepository;
    }
    async findAll() {
        const employees = await this.employeeRepository.find({
            relations: ['static', 'subcategory']
        });
        return employees.map(employee => {
            const levels = employee.static.filter(staticItem => staticItem.type === static_entity_1.Type.Level);
            const jobTypes = employee.static.filter(staticItem => staticItem.type === static_entity_1.Type.Job_type);
            const categories = employee.static.filter(staticItem => staticItem.type === static_entity_1.Type.Category);
            return {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
                gender: employee.gender,
                image: employee.image,
                resume: employee.resume,
                levels,
                jobTypes,
                categories,
                SubCategory: employee.subcategory
            };
        });
    }
    async findOne(id) {
        const employee = await this.employeeRepository.find({ where: { id: id }, relations: ['static', 'subcategory'] });
        if (!employee) {
            throw new common_1.HttpException(`Employee with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return employee.map(employee => {
            const levels = employee.static.filter(staticItem => staticItem.type === static_entity_1.Type.Level);
            const jobTypes = employee.static.filter(staticItem => staticItem.type === static_entity_1.Type.Job_type);
            const categories = employee.static.filter(staticItem => staticItem.type === static_entity_1.Type.Category);
            return {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
                gender: employee.gender,
                image: employee.image,
                resume: employee.resume,
                levels,
                jobTypes,
                categories,
                SubCategory: employee.subcategory
            };
        });
    }
    async jobs(fields) {
        let staticsArray;
        if (fields && fields.statics) {
            staticsArray = fields.statics.split(',').map(Number);
            delete fields.statics;
        }
        let subcategoriesArray;
        if (fields && fields.subcategories) {
            subcategoriesArray = fields.subcategories.split(',').map(Number);
            delete fields.subcategories;
        }
        if (staticsArray) {
            const staticsCondition = {
                static: {
                    id: (0, typeorm_2.In)(staticsArray),
                },
            };
            fields = { ...fields, ...staticsCondition };
        }
        if (subcategoriesArray) {
            const subcategoriesCondition = {
                subCategories: {
                    id: (0, typeorm_2.In)(subcategoriesArray),
                },
            };
            fields = { ...fields, ...subcategoriesCondition };
        }
        const jobs = await this.jobRepository.find({
            where: fields,
            select: ['id'],
        });
        const ids = [];
        for (const job of jobs) {
            ids.push(job.id);
        }
        return await this.jobRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
            relations: ['company', 'static', 'subCategories'],
            order: {
                company: {
                    premiumLevel: 'DESC',
                },
            },
        });
    }
    async remove(id) {
        const employee = await this.employeeRepository.findOne({ where: { id: id } });
        if (!employee) {
            throw new common_1.HttpException(`Employee with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.employeeRepository.remove(employee);
        return {
            statusCode: 200,
            message: `Employee with id ${id} has been successfully removed`,
        };
    }
    async activateJob(activateJobDto) {
        const job = await this.jobRepository.findOne({ where: { id: activateJobDto.job_id } });
        if (!job) {
            throw new common_1.NotFoundException(`Job with id ${activateJobDto.job_id} not found`);
        }
        if (job.active) {
            throw new common_1.BadRequestException('job already activated');
        }
        job.active = true;
        await this.jobRepository.update(job.id, job);
        return 'Job activated successfully';
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(static_entity_1.Static)),
    __param(2, (0, typeorm_1.InjectRepository)(sub_category_entity_1.SubCategory)),
    __param(3, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SuperAdminService);
//# sourceMappingURL=super-admin.service.js.map