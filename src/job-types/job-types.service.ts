import { Injectable } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';
import { JobType } from './entities/job-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobTypesService {
  constructor(@InjectRepository(JobType) private jobTypeRepository: Repository<JobType>) {
  }

  async create(createJobTypeDto: CreateJobTypeDto) {
    return await this.jobTypeRepository.save(createJobTypeDto);
  }

  async findAll() {
    return await this.jobTypeRepository.find();
  }

  async findOne(id: number) {
    return await this.jobTypeRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateJobTypeDto: UpdateJobTypeDto) {
    const jobType = await this.findOne(id);
    if (!jobType) {
      return {
        statusCode: 400,
        message: 'Bad Request: No such jobType found',
      };
    }

    await this.jobTypeRepository.update(id, updateJobTypeDto);
    return {
      statusCode: 200,
      message: 'jobType updated successfully',
    };
  }

  async remove(id: number) {
    const jobType = await this.findOne(id);
    if (!jobType) {
      return {
        statusCode: 400,
        message: 'Bad Request: No such jobType found',
      };
    }

    await this.jobTypeRepository.remove(jobType);
    return {
      statusCode: 200,
      message: `JobType with id ${id} has been successfully removed`,
    };
  }
}
