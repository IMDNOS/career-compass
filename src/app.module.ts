import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../ormconfig";
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [EmployeesModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule {}
