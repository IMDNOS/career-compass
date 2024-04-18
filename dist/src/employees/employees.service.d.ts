import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
export declare class EmployeesService {
    private employeeRepository;
    private jwtService;
    constructor(employeeRepository: Repository<Employee>, jwtService: JwtService);
    register(createEmployeeDto: CreateEmployeeDto): Promise<Tokens>;
    login(loginEmployeeDto: LoginEmployeeDto): Promise<Tokens>;
    logout(employee_id: number): Promise<import("typeorm").UpdateResult>;
    refreshTokens(employee_id: number, rt: string): Promise<Tokens>;
    private hashData;
    private getTokens;
    private updateRefreshToken;
}
