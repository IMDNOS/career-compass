import { SuperAdminAuthService } from './super-adminAuth.service';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { ActivateSuperAdmin, MakeManagerDto } from './dto/activate-super-admin';
export declare class SuperAdminAuthController {
    private readonly superAdminAuthService;
    constructor(superAdminAuthService: SuperAdminAuthService);
    register(createSuperAdminDto: CreateSuperAdminDto): Promise<import("./entities/super-admin.entity").SuperAdmin>;
    login(loginSuperAdminDto: LoginSuperAdminDto): Promise<{
        access_token: string;
    }>;
    activate(activateSuperAdmin: ActivateSuperAdmin): Promise<string>;
    makeManager(makeManagerDto: MakeManagerDto): Promise<string>;
}
