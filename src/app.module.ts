import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeAuthModule } from './employees/employeeAuth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { APP_PIPE } from '@nestjs/core';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { StaticsModule } from './statics/statics.module';


@Module({
  imports: [EmployeeAuthModule, TypeOrmModule.forRoot(config), SubCategoriesModule
    , SuperAdminModule, CompanyModule, JobModule, StaticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})
export class AppModule {
}
