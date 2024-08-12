import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTokenEmployee } from './entities/employee-notification-token.entity';
import { Notifications } from './entities/notification.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Company } from '../company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notifications,NotificationTokenEmployee,Employee,Company])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
