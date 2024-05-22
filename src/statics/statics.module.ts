import { Module } from '@nestjs/common';
import { StaticsService } from './statics.service';
import { StaticsController } from './statics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Static } from './entities/static.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Static,SubCategory])],
  controllers: [StaticsController],
  providers: [StaticsService],
})
export class StaticsModule {}
