import { Module } from '@nestjs/common';
import { JobTypesService } from './job-types.service';
import { JobTypesController } from './job-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobType } from './entities/job-type.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([JobType]),
    ConfigModule.forRoot({ isGlobal: true })],
  controllers: [JobTypesController],
  providers: [JobTypesService],
})
export class JobTypesModule {}
