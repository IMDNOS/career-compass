import { SuperAdminService } from './super-admin.service';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
export declare class SuperAdminController {
    private readonly superAdminService;
    constructor(superAdminService: SuperAdminService);
    login(loginsuperadmindto: LoginSuperAdminDto): Promise<{
        access_token: string;
    }>;
    findAll(): Promise<import("../employees/entities/employee.entity").Employee[]>;
    findOne(id: string): Promise<import("../employees/entities/employee.entity").Employee>;
}
