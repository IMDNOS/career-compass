"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminModule = void 0;
const common_1 = require("@nestjs/common");
const super_adminAuth_service_1 = require("./super-adminAuth.service");
const super_adminAuth_controller_1 = require("./super-adminAuth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("../employees/entities/employee.entity");
const at_strategy_superAdmin_1 = require("./strategies/at-strategy-superAdmin");
const jwt_1 = require("@nestjs/jwt");
const super_admin_controller_1 = require("./super-admin.controller");
const super_admin_service_1 = require("./super-admin.service");
const super_admin_entity_1 = require("./entities/super-admin.entity");
const sub_category_entity_1 = require("../sub-categories/entities/sub-category.entity");
const static_entity_1 = require("../statics/entities/static.entity");
const job_entity_1 = require("../job/entities/job.entity");
let SuperAdminModule = class SuperAdminModule {
};
exports.SuperAdminModule = SuperAdminModule;
exports.SuperAdminModule = SuperAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([super_admin_entity_1.SuperAdmin, employee_entity_1.Employee, sub_category_entity_1.SubCategory, static_entity_1.Static, job_entity_1.Job]),
            jwt_1.JwtModule.register({})],
        controllers: [super_adminAuth_controller_1.SuperAdminAuthController, super_admin_controller_1.SuperAdminController],
        providers: [super_adminAuth_service_1.SuperAdminAuthService, super_admin_service_1.SuperAdminService, at_strategy_superAdmin_1.AtStrategySuperAdmin]
    })
], SuperAdminModule);
//# sourceMappingURL=super-admin.module.js.map