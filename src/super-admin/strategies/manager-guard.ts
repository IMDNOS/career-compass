import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperAdmin } from '../entities/super-admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(@InjectRepository(SuperAdmin) private superAdminRepository: Repository<SuperAdmin>) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin_id = request.user['id'];

    const admin = await this.superAdminRepository.findOne({ where: { id: admin_id } });

    return admin.manager;
  }
}