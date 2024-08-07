import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Job } from '../job/entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { ApplyToJobDto } from '../employees/dto/apply-to-job.dto';
import { Employee } from '../employees/entities/employee.entity';
import { Employee_job } from '../job/entities/employee_job.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Job) private jobRepository: Repository<Job> ,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Employee_job) private readonly employee_jobRepository: Repository<Employee_job>,) {}


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


  async getEmployeesApplying(companyId: number, jobId:number) {
    const Company = await this.companyRepository.findOne({
      where: { id: companyId }
    });
    if (!Company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const Job = await this.jobRepository.findOne({
      where: { id: jobId, company: Company }
    });

    if (!Job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    const employeeJobs = await this.employee_jobRepository.find({
      where: {
        job: Job,
        accepted: false
      },
      relations: ['employee', 'job']
    });

    if (!employeeJobs || employeeJobs.length === 0) {
      throw new NotFoundException(`No employees applying for job with ID ${jobId} found`);
    }

    return employeeJobs;
  }


  async getEmployeesAccepted(companyId:number ,jobId:number){
    const Company = await this.companyRepository.findOne({
      where: { id: companyId }
    });
    if (!Company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const Job = await this.jobRepository.findOne({where:{id:jobId , company:Company}});
    if (!Job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    const employeesJob =await this.employee_jobRepository.find({where:{
        job: Job,
        accepted:true
      },
      relations: ['employee', 'job']
  });

  if (!employeesJob || employeesJob.length === 0) {
  throw new NotFoundException(`No employees accepted for job with ID ${jobId} found`);
}

return employeesJob;
}


  async employeeAcceptance(id: number, companyId: number, job: ApplyToJobDto) {
    const Company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!Company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const employee = await this.employeeRepository.findOne({ where: { id: id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    const Job = await this.jobRepository.findOne({ where: { id: job.job_id, company: Company } });
    if (!Job) {
      throw new NotFoundException(`Job with ID ${job.job_id} not found`);
    }

    // التحقق من عدد الموظفين المقبولين حاليًا لهذه الوظيفة
    const acceptedEmployeesCount = await this.employee_jobRepository.count({
      where: {
        job: Job,
        accepted: true,
      },
    });

    if (acceptedEmployeesCount == Job.number_of_employees) {
      throw new BadRequestException(`The number of accepted employees for job with ID ${job.job_id} has reached its limit`);
    }

    const employeeJob = await this.employee_jobRepository.findOne({
      where: {
        employee: employee,
        job: Job,
      },
    });

    if (!employeeJob) {
      throw new NotFoundException(`Application for employee with ID ${id} for job with ID ${job.job_id} not found`);
    }

    employeeJob.accepted = true;
    await this.employee_jobRepository.save(employeeJob);

    return {
      message: 'The employee has been successfully accepted.',
      employeeJob: employeeJob,
    };
  }


//   update(id: number, updateCompanyDto: UpdateCompanyDto) {
//     return `This action updates a #${id} company`;
//   }
//
//   remove(id: number) {
//     return `This action removes a #${id} company`;
//   }

}
