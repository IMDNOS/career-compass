import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyAuthService } from './companyAuth.service';
import { CompanyAuthController } from './companyAuth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { JwtModule } from '@nestjs/jwt';
import { Company } from './entities/company.entity';
import { AtStrategy } from './strategies/at-strategy';
import { RtStrategy } from './strategies/rt-strategy';

@Module({
  imports:[TypeOrmModule.forFeature([Company]),
    JwtModule.register({})],
  controllers: [CompanyController,CompanyAuthController],
  providers: [CompanyService,CompanyAuthService,AtStrategy,RtStrategy],
})
export class CompanyModule {}
