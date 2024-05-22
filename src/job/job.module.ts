import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Company } from '../company/entities/company.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Job,Company,SubCategory])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
