import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeAuthModule } from './employees/employeeAuth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../ormconfig";
import { APP_PIPE } from "@nestjs/core";
import { SuperAdminModule } from './super-admin/super-admin.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { TypesModule } from './types/types.module';
import { LevelsModule } from './levels/levels.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';




@Module({
  imports: [EmployeeAuthModule, TypeOrmModule.forRoot(config) ,SuperAdminModule, CategoriesModule, SubCategoriesModule, TypesModule, LevelsModule, CompanyModule, JobModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },]
})
export class AppModule {}
