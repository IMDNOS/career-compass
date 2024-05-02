import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Category } from './entities/category.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Category]),
    ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
