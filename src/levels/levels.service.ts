import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';

@Injectable()
export class LevelsService {
  constructor(@InjectRepository(Level) private levelRepository: Repository<Level>) {
  }
async  create(createLevelDto: CreateLevelDto) {
    return await this.levelRepository.save(createLevelDto);
  }

  async findAll() {
    return await this.levelRepository.find();
  }

  async findOne(id: number) {
    return await this.levelRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateLevelDto: UpdateLevelDto) {
    const level = await this.findOne(id);
    if (!level) {
      return {
        statusCode: 400,
        message: 'Bad Request: No such level found',
      };
    }

    await this.levelRepository.update(id, updateLevelDto);
    return {
      statusCode: 200,
      message: 'level updated successfully',
    };  }

 async remove(id: number) {
    const level = await this.findOne(id);
    if (!level) {
      return {
        statusCode: 400,
        message: 'Bad Request: No such level found',
      };
    }

    await this.levelRepository.remove(level);
    return {
      statusCode: 200,
      message: `level with id ${id} has been successfully removed`,
    };  }
}
