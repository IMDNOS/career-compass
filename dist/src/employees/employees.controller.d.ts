import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Request } from 'express';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    register(createEmployeeDto: CreateEmployeeDto): Promise<import("./types/tokens.type").Tokens>;
    login(loginEmployeeDto: LoginEmployeeDto): Promise<import("./types/tokens.type").Tokens>;
    logout(req: Request): Promise<import("typeorm").UpdateResult>;
    refreshTokens(req: Request): Promise<import("./types/tokens.type").Tokens>;
}
