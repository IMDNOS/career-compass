import { EmployeeAuthService } from './employeeAuth.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Request } from 'express';
import { Tokens } from './types/tokens.type';
import { ActivateEmployeeDto } from './dto/activate-employee.dto';
import { RequestActivationCodeDto } from './dto/request-activation-code.dto';
export declare class EmployeeAuthController {
    private readonly employeesService;
    constructor(employeesService: EmployeeAuthService);
    register(createEmployeeDto: CreateEmployeeDto): Promise<string | Tokens>;
    requestActivationCode(requestActivationCodeDto: RequestActivationCodeDto): Promise<string | Tokens>;
    activateAccount(activateEmployeeDto: ActivateEmployeeDto): Promise<Tokens>;
    login(loginEmployeeDto: LoginEmployeeDto): Promise<Tokens>;
    logout(req: Request): Promise<{
        message: string;
    }>;
    refreshTokens(req: Request): Promise<Tokens>;
}
