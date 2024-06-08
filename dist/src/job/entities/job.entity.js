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
exports.Job = exports.Gender = void 0;
const typeorm_1 = require("typeorm");
const sub_category_entity_1 = require("../../sub-categories/entities/sub-category.entity");
const company_entity_1 = require("../../company/entities/company.entity");
const static_entity_1 = require("../../statics/entities/static.entity");
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (exports.Gender = Gender = {}));
let Job = class Job {
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company),
    __metadata("design:type", company_entity_1.Company)
], Job.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "work_hours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Job.prototype, "experience_years", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender, nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "wanted_gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Job.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => static_entity_1.Static),
    (0, typeorm_1.JoinTable)({ name: 'job_statics' }),
    __metadata("design:type", Array)
], Job.prototype, "static", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => sub_category_entity_1.SubCategory),
    (0, typeorm_1.JoinTable)({ name: 'job_subcategories' }),
    __metadata("design:type", Array)
], Job.prototype, "subCategories", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)()
], Job);
//# sourceMappingURL=job.entity.js.map