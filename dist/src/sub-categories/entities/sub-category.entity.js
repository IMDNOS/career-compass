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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const job_entity_1 = require("../../job/entities/job.entity");
let SubCategory = class SubCategory {
};
exports.SubCategory = SubCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SubCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, employee => employee.subCategory),
    __metadata("design:type", Array)
], SubCategory.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_entity_1.Job, job => job.subCategory),
    __metadata("design:type", Array)
], SubCategory.prototype, "jobs", void 0);
exports.SubCategory = SubCategory = __decorate([
    (0, typeorm_1.Entity)()
], SubCategory);
//# sourceMappingURL=sub-category.entity.js.map