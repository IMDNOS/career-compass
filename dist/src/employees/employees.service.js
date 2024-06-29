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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const typeorm_2 = require("typeorm");
const static_entity_1 = require("../statics/entities/static.entity");
const sub_category_entity_1 = require("../sub-categories/entities/sub-category.entity");
const job_entity_1 = require("../job/entities/job.entity");
const employee_job_entity_1 = require("../job/entities/employee_job.entity");
let EmployeesService = class EmployeesService {
    constructor(employeeRepository, staticRepository, subCategoryRepository, jobRepository, employee_jobRepository) {
        this.employeeRepository = employeeRepository;
        this.staticRepository = staticRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.jobRepository = jobRepository;
        this.employee_jobRepository = employee_jobRepository;
    }
    async getInfo(employee_id) {
        return await this.employeeRepository.findOne({
            where: { id: employee_id },
            select: [
                'name',
                'email',
                'phone',
                'home_address',
                'birthday_date',
                'image',
                'resume',
                'gender',
            ],
        });
    }
    async update(updateEmployeeDto, employeeId) {
        if (!updateEmployeeDto || Object.keys(updateEmployeeDto).length === 0) {
            throw new common_1.HttpException('Empty request', common_1.HttpStatus.BAD_REQUEST);
        }
        let employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        });
        if (!employee) {
            return { message: 'Employee not found' };
        }
        updateEmployeeDto.email = employee.email;
        await this.employeeRepository.update(employee, updateEmployeeDto);
        employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        });
        return employee;
    }
    async setStatics(employeeId, staticsDto) {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
            relations: ['static'],
        });
        employee.static = [];
        for (const staticDto of staticsDto) {
            const staticEntity = await this.staticRepository.findOne({
                where: { name: staticDto.name },
            });
            if (staticEntity) {
                employee.static.push(staticEntity);
            }
        }
        await this.employeeRepository.save(employee);
        return employee.static;
    }
    async getStatics(employeeId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
            relations: ['static'],
        });
        if (!employee) {
            throw new Error(`Employee with id ${employeeId} not found`);
        }
        const levels = employee.static.filter((staticItem) => staticItem.type === static_entity_1.Type.Level);
        const jobTypes = employee.static.filter((staticItem) => staticItem.type === static_entity_1.Type.Job_type);
        const categories = employee.static.filter((staticItem) => staticItem.type === static_entity_1.Type.Category);
        return { levels, jobTypes, categories };
    }
    async setSubcategories(employeeId, subcategoriesDto) {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        });
        employee.subcategory = [];
        for (const subCategoriesDto of subcategoriesDto) {
            const subcategoryEntity = await this.subCategoryRepository.findOne({
                where: { name: subCategoriesDto.name },
            });
            if (subcategoryEntity) {
                employee.subcategory.push(subcategoryEntity);
            }
        }
        await this.employeeRepository.save(employee);
        return employee.subcategory;
    }
    async getSubcategories(employeeId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
            relations: ['subcategory'],
        });
        return employee.subcategory;
    }
    async setEducationAndExperience(id, setEducationAndExperienceDto) {
        const employee = await this.employeeRepository.findOne({
            where: { id: id },
        });
        if (!employee)
            throw new common_1.ForbiddenException('Employee with id ${id} not found');
        await this.employeeRepository.update(id, setEducationAndExperienceDto);
        const updatedEmployee = await this.employeeRepository.findOne({
            where: { id: id },
        });
        return updatedEmployee;
    }
    async saveImage(file, employeeId) {
        if (!file) {
            throw new common_1.BadRequestException('File not provided');
        }
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${employeeId} not found`);
        }
        employee.image = `${file.filename}`;
        await this.employeeRepository.save(employee);
        return { ...employee };
    }
    async saveFile(file, employeeId) {
        if (!file) {
            throw new common_1.BadRequestException('File not provided');
        }
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${employeeId} not found`);
        }
        employee.resume = `${file.filename}`;
        await this.employeeRepository.save(employee);
        return { ...employee };
    }
    async jobs(fields) {
        fields.active = true;
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
    async applyForJob(employeeId, applyToJobDto) {
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
        const job = await this.jobRepository.findOne({ where: { id: applyToJobDto.job_id } });
        const employeeJob = this.employee_jobRepository.create({
            employee: employee,
            job: job,
        });
        return await this.employee_jobRepository.save(employeeJob);
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(static_entity_1.Static)),
    __param(2, (0, typeorm_1.InjectRepository)(sub_category_entity_1.SubCategory)),
    __param(3, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(4, (0, typeorm_1.InjectRepository)(employee_job_entity_1.Employee_job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map