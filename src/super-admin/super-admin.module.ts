import { Module } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminController } from './super-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { ConfigModule } from '@nestjs/config';
import { AtStrategy } from './strategies/at-strategy';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[ TypeOrmModule.forFeature([Employee]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({})],
  controllers: [SuperAdminController],
  providers: [SuperAdminService , AtStrategy]
})
export class SuperAdminModule {}
