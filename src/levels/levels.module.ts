import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Level])],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
