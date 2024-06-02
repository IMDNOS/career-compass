import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SuperAdmin } from '../entities/super-admin.entity';
import { Repository } from 'typeorm';
export declare class ManagerGuard implements CanActivate {
    private superAdminRepository;
    constructor(superAdminRepository: Repository<SuperAdmin>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
