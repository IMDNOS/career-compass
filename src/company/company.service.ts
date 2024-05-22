import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Job } from '../job/entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
//   constructor(
//     @InjectRepository(Company) private companyRepository: Repository<Company>,
//     @InjectRepository(Job) private jobRepository: Repository<Job>     ) {}
//   create(createCompanyDto: CreateCompanyDto) {
//     return 'This action adds a new company';
//   }
//
//   async findAll(companyID: number): Promise<Job[]> {
//     return await this.jobRepository.find({
//       where: { company: { id: companyID } }, // Filter by company ID,
//       relations: ['category', 'subCategories', 'level', 'jobType'],
//       select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","wanted_gender"]
//     });
//   }
//
//   async findOne(id: number,companyID: number): Promise<Job[]> {
//     return await this.jobRepository.find({
//       where: { id: id , company: { id: companyID }} , // Filter by company ID,
//       relations: ['category', 'subCategories', 'level', 'jobType'],
//       select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","wanted_gender"]
//     });
//   }
//
//   update(id: number, updateCompanyDto: UpdateCompanyDto) {
//     return `This action updates a #${id} company`;
//   }
//
//   remove(id: number) {
//     return `This action removes a #${id} company`;
//   }
}
