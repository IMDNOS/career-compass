import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([Level]),
    ConfigModule.forRoot({ isGlobal: true })],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
