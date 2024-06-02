"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const employeeAuth_module_1 = require("./employees/employeeAuth.module");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("../ormconfig");
const core_1 = require("@nestjs/core");
const sub_categories_module_1 = require("./sub-categories/sub-categories.module");
const super_admin_module_1 = require("./super-admin/super-admin.module");
const company_module_1 = require("./company/company.module");
const job_module_1 = require("./job/job.module");
const statics_module_1 = require("./statics/statics.module");
const serve_static_1 = require("@nestjs/serve-static");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: './uploadsImages',
                serveRoot: '/uploadsImages',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: './uploadsFiles',
                serveRoot: '/uploadsFiles',
            }),
            employeeAuth_module_1.EmployeeAuthModule, sub_categories_module_1.SubCategoriesModule, super_admin_module_1.SuperAdminModule, company_module_1.CompanyModule, job_module_1.JobModule, statics_module_1.StaticsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map