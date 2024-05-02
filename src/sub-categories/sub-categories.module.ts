import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SubCategory } from './entities/sub-category.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/entities/category.entity';
@Module({
  imports:[ TypeOrmModule.forFeature([SubCategory,Category])],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
})
export class SubCategoriesModule {}
