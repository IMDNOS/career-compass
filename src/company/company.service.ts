import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Job } from '../job/entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Job) private jobRepository: Repository<Job>     ) {}


  async saveLogo(file: Express.Multer.File, companyId: number) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException(`Employee with ID ${companyId} not found`);
    }

    company.logo = `${file.filename}`;

    await this.companyRepository.save(company);

    return { ...company };
  }


  async getlogo(companyId: number) {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const companyImagePath = `uploadsimages/${company.logo}`;

    if(company.logo === null){
      throw new BadRequestException('Logo not provided');
    }

    return companyImagePath;
  }

  async findAllJobs(companyID: number): Promise<Job[]> {

    return this.jobRepository.find({ where:{company: { id: companyID },active : true},
      relations: ['static', 'subCategories'],
      select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","wanted_gender"]
    });
  }

  async findOneJobById(id: number,companyID: number): Promise<Job[]> {
    return await this.jobRepository.find({
      where: { id: id , company: { id: companyID },active : true} , // Filter by company ID,
      relations: ['static', 'subCategories'],
      select: ["id", "title", "company","description", "salary", "work_hours", "experience_years","wanted_gender"]
    });
  }
//
//   update(id: number, updateCompanyDto: UpdateCompanyDto) {
//     return `This action updates a #${id} company`;
//   }
//
//   remove(id: number) {
//     return `This action removes a #${id} company`;
//   }

}
