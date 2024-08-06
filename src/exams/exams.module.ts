import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam,SubCategory])],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
