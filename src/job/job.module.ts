import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Company } from '../company/entities/company.entity';
import { Level } from '../levels/entities/level.entity';
import { JobType } from '../job-types/entities/job-type.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Job,Company,Level,JobType,SubCategory,Category])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
