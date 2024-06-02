import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ActivateEmployeeDto } from './dto/activate-employee.dto';
import { RequestActivationCodeDto } from './dto/request-activation-code.dto';
export declare class EmployeeAuthService {
    private employeeRepository;
    private jwtService;
    constructor(employeeRepository: Repository<Employee>, jwtService: JwtService);
    register(createEmployeeDto: CreateEmployeeDto): Promise<string | Tokens>;
    requestActivationCode(requestActivationCodeDto: RequestActivationCodeDto): Promise<string | Tokens>;
    activateAccount(activateEmployeeDto: ActivateEmployeeDto): Promise<Tokens>;
    login(loginEmployeeDto: LoginEmployeeDto): Promise<Tokens>;
    logout(employee_id: number): Promise<{
        message: string;
    }>;
    refreshTokens(employee_id: number, rt: string): Promise<Tokens>;
    private hashData;
    private getTokens;
    private updateRefreshToken;
    private generateRandomCode;
}
