import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Type } from './entities/type.entity';


@Module({
  imports:[ TypeOrmModule.forFeature([Type]),
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true })],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
