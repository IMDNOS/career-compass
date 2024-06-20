import { SuperAdminAuthService } from './super-adminAuth.service';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
export declare class SuperAdminAuthController {
    private readonly superAdminAuthService;
    constructor(superAdminAuthService: SuperAdminAuthService);
    login(loginSuperAdminDto: LoginSuperAdminDto): Promise<{
        access_token: string;
    }>;
    createAdmin(createSuperAdminDto: CreateSuperAdminDto): Promise<import("./entities/super-admin.entity").SuperAdmin>;
}
