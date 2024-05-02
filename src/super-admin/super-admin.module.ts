import { Module } from '@nestjs/common';
import { SuperAdminAuthService } from './super-adminAuth.service';
import { SuperAdminAuthController } from './super-adminAuth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { ConfigModule } from '@nestjs/config';
import { AtStrategySuperAdmin } from './strategies/at-strategy-superAdmin';
import { JwtModule } from '@nestjs/jwt';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdminService } from './super-admin.service';
import { SuperAdmin } from './entities/super-admin.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([SuperAdmin,Employee]),
    JwtModule.register({})],
  controllers: [SuperAdminAuthController, SuperAdminController],
  providers: [SuperAdminAuthService ,SuperAdminService, AtStrategySuperAdmin]
})
export class SuperAdminModule {}
