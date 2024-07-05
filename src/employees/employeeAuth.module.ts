import { Module } from '@nestjs/common';
import { EmployeeAuthService } from './employeeAuth.service';
import { EmployeeAuthController } from './employeeAuth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AtStrategy } from './strategies/at-strategy';
import { RtStrategy } from './strategies/rt-strategy';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Static } from '../statics/entities/static.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Job } from '../job/entities/job.entity';
import { Employee_job } from '../job/entities/employee_job.entity';
import { EmployeeSubCategory } from './entities/employeeSubcategory.entity';



@Module({
  imports:[ TypeOrmModule.forFeature([Employee,Static,SubCategory,Job,Employee_job,EmployeeSubCategory]),
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true })],
  controllers: [EmployeeAuthController, EmployeesController ,],
  providers: [EmployeeAuthService, AtStrategy, RtStrategy, EmployeesService],
})
export class EmployeeAuthModule {}
