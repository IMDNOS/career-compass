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
exports.Job = exports.Gender = exports.WorkTime = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../../categories/entities/category.entity");
const sub_category_entity_1 = require("../../sub-categories/entities/sub-category.entity");
const type_entity_1 = require("../../types/entities/type.entity");
const level_entity_1 = require("../../levels/entities/level.entity");
var WorkTime;
(function (WorkTime) {
    WorkTime["PartTime"] = "part time";
    WorkTime["FullTime"] = "full time";
    WorkTime["FromHome"] = "from home";
})(WorkTime || (exports.WorkTime = WorkTime = {}));
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
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Job.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "experience_years", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: WorkTime }),
    __metadata("design:type", String)
], Job.prototype, "work_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender }),
    __metadata("design:type", String)
], Job.prototype, "wanted_gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], Job.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.jobs),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], Job.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_category_id' }),
    __metadata("design:type", Number)
], Job.prototype, "subCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_category_entity_1.SubCategory, subCategory => subCategory.jobs),
    (0, typeorm_1.JoinColumn)({ name: 'sub_category_id' }),
    __metadata("design:type", sub_category_entity_1.SubCategory)
], Job.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type_id' }),
    __metadata("design:type", Number)
], Job.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => type_entity_1.Type, type => type.jobs),
    (0, typeorm_1.JoinColumn)({ name: 'type_id' }),
    __metadata("design:type", type_entity_1.Type)
], Job.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'level_id' }),
    __metadata("design:type", Number)
], Job.prototype, "levelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => level_entity_1.Level, level => level.jobs),
    (0, typeorm_1.JoinColumn)({ name: 'level_id' }),
    __metadata("design:type", level_entity_1.Level)
], Job.prototype, "level", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)()
], Job);
//# sourceMappingURL=job.entity.js.map