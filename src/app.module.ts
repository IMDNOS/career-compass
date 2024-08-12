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
import { ServeStaticModule } from '@nestjs/serve-static';
import { Static } from './statics/entities/static.entity';
import { SubCategory } from './sub-categories/entities/sub-category.entity';
import { SuperAdmin } from './super-admin/entities/super-admin.entity';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [ TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Static,SubCategory,SuperAdmin])
    ,
    ServeStaticModule.forRoot({
      rootPath: './uploadsImages',
      serveRoot:'/uploadsImages',
    }),
    ServeStaticModule.forRoot({
      rootPath: './uploadsFiles',
      serveRoot:'/uploadsFiles',
    }),
    EmployeeAuthModule, SubCategoriesModule, SuperAdminModule, CompanyModule, JobModule, StaticsModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})
export class AppModule {
}
