import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { In, Repository } from 'typeorm';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Static, Type } from '../statics/entities/static.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Company } from '../company/entities/company.entity';
import { Job } from '../job/entities/job.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Static)
    private readonly staticRepository: Repository<Static>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {
  }

  async getInfo(employee_id: number) {
    return await this.employeeRepository.findOne({
      where: { id: employee_id },
      select: ['name', 'email', 'phone', 'home_address', 'birthday_date', 'image', 'resume', 'gender'],
    });
  }


  async update(updateEmployeeDto: UpdateEmployeeDto, employeeId: number) {
    if (!updateEmployeeDto || Object.keys(updateEmployeeDto).length === 0) {
      throw new HttpException('Empty request', HttpStatus.BAD_REQUEST);
    }
    let employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      return { message: 'Employee not found' };
    }
    updateEmployeeDto.email = employee.email;
    await this.employeeRepository.update(employee, updateEmployeeDto);

    employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    return employee;
  }

  async setStatics(employeeId: number, staticsDto: { name: string }[]) {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId }, relations: ['static'] });
    employee.static = [];

    for (const staticDto of staticsDto) {
      const staticEntity = await this.staticRepository.findOne({ where: { name: staticDto.name } });
      if (staticEntity) {
        employee.static.push(staticEntity);
      }
    }
    await this.employeeRepository.save(employee);
    return employee.static;
  }


  async getStatics(employeeId: number) {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId }, relations: ['static'] });

    if (!employee) {
      throw new Error(`Employee with id ${employeeId} not found`);
    }

    const levels = employee.static.filter(staticItem => staticItem.type === Type.Level);
    const jobTypes = employee.static.filter(staticItem => staticItem.type === Type.Job_type);
    const categories = employee.static.filter(staticItem => staticItem.type === Type.Category);

    return { levels, jobTypes, categories };
  }


  async setSubcategories(employeeId: number, subcategoriesDto: { name: string }[]) {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    employee.subcategory = [];

    for (const subCategoriesDto of subcategoriesDto) {
      const subcategoryEntity = await this.subCategoryRepository.findOne({ where: { name: subCategoriesDto.name } });
      if (subcategoryEntity) {
        employee.subcategory.push(subcategoryEntity);
      }
    }
    await this.employeeRepository.save(employee);
    return employee.subcategory;
  }

  async getSubcategories(employeeId: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['subcategory'],
    });

    return employee.subcategory;
  }


  async saveImage(file: Express.Multer.File, employeeId: number) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    employee.image = `${file.filename}`;

    await this.employeeRepository.save(employee);

    return { ...employee };

  }

  async saveFile(file: Express.Multer.File, employeeId: number) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    employee.resume = `${file.filename}`;

    await this.employeeRepository.save(employee);

    return { ...employee };

  }

  async jobs(fields?: any) {

    fields.active=true

    const statics = [];

    if (fields && fields.category) {
      statics.push(fields.category);
      delete fields['category'];
    }
    if (fields && fields.level) {
      statics.push(fields.level);
      delete fields['level'];
    }
    if (fields && fields.type) {
      statics.push(fields.type);
      delete fields['type'];
    }


    const staticsCondition = {
      static: {
        // id:In(statics)// Mona this is to change the search from name to id
        name: In(statics)
      }
    };

    if(statics.length > 0)
     fields={...fields, ...staticsCondition};


    // return fields

    return this.jobRepository.find({
      relations: ['company', 'static'],
      where: fields,
      order: {
        'company': {
          'premium': 'DESC'
        }
      }
    });
  }

  // async jobs(fields?: any) {
  //   return this.jobRepository.createQueryBuilder('job')
  //     .leftJoinAndSelect('job.company', 'company')
  //     .leftJoinAndSelect('job.static', 'statics')
  //     .where(fields)
  //     // .where((qb) => {
  //     //   if (fields && fields.static) {
  //     //     qb.where('statics.name LIKE :static', { staticName: `%${fields.staticName}%` });
  //     //   }
  //     // })
  //     .orderBy('company.premium', 'DESC')
  //     .getMany();
  // }


}