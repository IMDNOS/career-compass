import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from './entities/super-admin.entity';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { ActivateSuperAdmin, MakeManagerDto } from './dto/activate-super-admin';
export declare class SuperAdminAuthService {
    private superAdminRepository;
    private jwtService;
    constructor(superAdminRepository: Repository<SuperAdmin>, jwtService: JwtService);
    register(createSuperAdminDto: CreateSuperAdminDto): Promise<SuperAdmin>;
    login(loginSuperAdminDto: LoginSuperAdminDto): Promise<{
        access_token: string;
    }>;
    activate(activateSuperAdmin: ActivateSuperAdmin): Promise<string>;
    makeManager(makeManagerDto: MakeManagerDto): Promise<string>;
    private getToken;
    private hashData;
}
