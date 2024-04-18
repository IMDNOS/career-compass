import { EmployeeAuthService } from './employeeAuth.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Request } from 'express';
export declare class EmployeeAuthController {
    private readonly employeesService;
    constructor(employeesService: EmployeeAuthService);
    register(createEmployeeDto: CreateEmployeeDto): Promise<import("./types/tokens.type").Tokens>;
    login(loginEmployeeDto: LoginEmployeeDto): Promise<import("./types/tokens.type").Tokens>;
    logout(req: Request): Promise<{
        message: string;
    }>;
    refreshTokens(req: Request): Promise<import("./types/tokens.type").Tokens>;
}
