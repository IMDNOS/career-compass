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
import { Job } from '../job/entities/job.entity';
import { Employee_job } from '../job/entities/employee_job.entity';
import { AdminNotifications } from '../super-admin/entities/admin-notifications.entity';
import { EmailSender } from '../mail-sender';
import { EmployeesService } from '../employees/employees.service';
import { NotificationsCompany } from './entities/notification-company.entity';
import { NotificationTokenCompany } from './entities/company-notification-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Company,
    Job,
    Company,
    Employee_job,
    Employee,
    AdminNotifications,
    NotificationTokenCompany, NotificationsCompany,
    // Notifications, NotificationTokenEmployee,
  ]),
    JwtModule.register({})],
  controllers: [CompanyController, CompanyAuthController],
  providers: [
    CompanyService,
    CompanyAuthService,
    AtStrategy,
    RtStrategy,
    EmailSender,
    // EmployeesService,
  ],
})
export class CompanyModule {
}
