"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeAuthModule = void 0;
const common_1 = require("@nestjs/common");
const employeeAuth_service_1 = require("./employeeAuth.service");
const employeeAuth_controller_1 = require("./employeeAuth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const at_strategy_1 = require("./strategies/at-strategy");
const rt_strategy_1 = require("./strategies/rt-strategy");
const employees_controller_1 = require("./employees.controller");
const employees_service_1 = require("./employees.service");
let EmployeeAuthModule = class EmployeeAuthModule {
};
exports.EmployeeAuthModule = EmployeeAuthModule;
exports.EmployeeAuthModule = EmployeeAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee]),
            jwt_1.JwtModule.register({}),
            config_1.ConfigModule.forRoot({ isGlobal: true })],
        controllers: [employeeAuth_controller_1.EmployeeAuthController, employees_controller_1.EmployeesController,],
        providers: [employeeAuth_service_1.EmployeeAuthService, at_strategy_1.AtStrategy, rt_strategy_1.RtStrategy, employees_service_1.EmployeesService],
    })
], EmployeeAuthModule);
//# sourceMappingURL=employeeAuth.module.js.map