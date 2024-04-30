import { EmployeeAuthService } from './employeeAuth.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Request } from 'express';
import { Tokens } from './types/tokens.type';
export declare class EmployeeAuthController {
    private readonly employeesService;
    constructor(employeesService: EmployeeAuthService);
    register(createEmployeeDto: CreateEmployeeDto): Promise<Tokens>;
    login(loginEmployeeDto: LoginEmployeeDto): Promise<Tokens>;
    logout(req: Request): Promise<{
        message: string;
    }>;
    refreshTokens(req: Request): Promise<Tokens>;
}
