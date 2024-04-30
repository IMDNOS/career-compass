import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class SuperAdminService {
    private employeeRepository;
    private jwtService;
    constructor(employeeRepository: Repository<Employee>, jwtService: JwtService);
    login(loginsuperadmindto: LoginSuperAdminDto): Promise<{
        access_token: string;
    }>;
    private getTokens;
    private hashData;
    private updateAccessToken;
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee>;
}
