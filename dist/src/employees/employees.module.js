"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const employees_service_1 = require("./employees.service");
const employees_controller_1 = require("./employees.controller");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const at_strategy_1 = require("./strategies/at-strategy");
const rt_strategy_1 = require("./strategies/rt-strategy");
let EmployeesModule = class EmployeesModule {
};
exports.EmployeesModule = EmployeesModule;
exports.EmployeesModule = EmployeesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee]),
            jwt_1.JwtModule.register({}),
            config_1.ConfigModule.forRoot({ isGlobal: true })],
        controllers: [employees_controller_1.EmployeesController,],
        providers: [employees_service_1.EmployeesService, at_strategy_1.AtStrategy, rt_strategy_1.RtStrategy],
    })
], EmployeesModule);
//# sourceMappingURL=employees.module.js.map