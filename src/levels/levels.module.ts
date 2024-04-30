import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Level } from './entities/level.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Level]),
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true })],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
