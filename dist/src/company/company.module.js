"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const company_controller_1 = require("./company.controller");
const companyAuth_service_1 = require("./companyAuth.service");
const companyAuth_controller_1 = require("./companyAuth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const company_entity_1 = require("./entities/company.entity");
const at_strategy_1 = require("./strategies/at-strategy");
const rt_strategy_1 = require("./strategies/rt-strategy");
const job_entity_1 = require("../job/entities/job.entity");
let CompanyModule = class CompanyModule {
};
exports.CompanyModule = CompanyModule;
exports.CompanyModule = CompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.Company, job_entity_1.Job]),
            jwt_1.JwtModule.register({})],
        controllers: [company_controller_1.CompanyController, companyAuth_controller_1.CompanyAuthController],
        providers: [company_service_1.CompanyService, companyAuth_service_1.CompanyAuthService, at_strategy_1.AtStrategy, rt_strategy_1.RtStrategy],
    })
], CompanyModule);
//# sourceMappingURL=company.module.js.map