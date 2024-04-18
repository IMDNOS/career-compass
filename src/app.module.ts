import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeAuthModule } from './employees/employeeAuth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../ormconfig";
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [EmployeeAuthModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule {}
