import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from './entities/super-admin.entity';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
export declare class SuperAdminAuthService {
    private superAdminRepository;
    private jwtService;
    constructor(superAdminRepository: Repository<SuperAdmin>, jwtService: JwtService);
    login(loginSuperAdminDto: LoginSuperAdminDto): Promise<{
        access_token: string;
    }>;
    createAdmin(createSuperAdminDto: CreateSuperAdminDto): Promise<SuperAdmin>;
    private getToken;
    private hashData;
}
