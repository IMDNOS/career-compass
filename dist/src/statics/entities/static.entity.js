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
exports.Static = exports.Type = void 0;
const sub_category_entity_1 = require("../../sub-categories/entities/sub-category.entity");
const typeorm_1 = require("typeorm");
var Type;
(function (Type) {
    Type["Category"] = "category";
    Type["Job_type"] = "job type";
    Type["Level"] = "level";
})(Type || (exports.Type = Type = {}));
let Static = class Static {
};
exports.Static = Static;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Static.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Static.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Type }),
    __metadata("design:type", String)
], Static.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_category_entity_1.SubCategory, subcategory => subcategory.category),
    __metadata("design:type", Array)
], Static.prototype, "subCategories", void 0);
exports.Static = Static = __decorate([
    (0, typeorm_1.Entity)()
], Static);
//# sourceMappingURL=static.entity.js.map