import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities/event.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
