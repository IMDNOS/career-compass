import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { In, Repository } from 'typeorm';
// import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';
import { Static, Type } from 'src/statics/entities/static.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { Job } from '../job/entities/job.entity';
import { ActivateJobDto } from './dto/update-super-admin.dto';

@Injectable()
export class SuperAdminService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
              @InjectRepository(Static) private staticRepository: Repository<Static>,
              @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
              @InjectRepository(Job) private jobRepository: Repository<Job>,
              ){}

    async findAll() {
    const employees = await this.employeeRepository.find({
        relations: ['static','subcategory'] });

        return employees.map(employee => {
          const levels = employee.static.filter(staticItem => staticItem.type === Type.Level);
          const jobTypes = employee.static.filter(staticItem => staticItem.type === Type.Job_type);
          const categories = employee.static.filter(staticItem => staticItem.type === Type.Category);
          return {
            id: employee.id,
            name: employee.name,
            email:employee.email,
            phone:employee.phone,
            gender:employee.gender,
            image:employee.image,
            resume:employee.resume,
            levels,
            jobTypes,
            categories,
            SubCategory:employee.subcategory
          }
        });
    }

    async findOne(id: number) {
      const employee = await this.employeeRepository.find({where:{id:id}, relations: ['static','subcategory'] });

      if (!employee) {
        throw new HttpException(`Employee with id ${id} not found`,HttpStatus.NOT_FOUND)
      }
      return employee.map(employee => {
        const levels = employee.static.filter(staticItem => staticItem.type === Type.Level);
        const jobTypes = employee.static.filter(staticItem => staticItem.type === Type.Job_type);
        const categories = employee.static.filter(staticItem => staticItem.type === Type.Category);
        return {
          id: employee.id,
          name: employee.name,
          email:employee.email,
          phone:employee.phone,
          gender:employee.gender,
          image:employee.image,
          resume:employee.resume,
          levels,
          jobTypes,
          categories,
          SubCategory:employee.subcategory}
      });
  }

  async jobs(fields?: any) {
    let staticsArray;

    if (fields && fields.statics) {
      staticsArray = fields.statics.split(',').map(Number);
      delete fields.statics;
    }

    let subcategoriesArray;
    if (fields && fields.subcategories) {
      subcategoriesArray = fields.subcategories.split(',').map(Number);
      delete fields.subcategories;
    }

    if (staticsArray) {
      const staticsCondition = {
        static: {
          id: In(staticsArray),
        },
      };
      fields = { ...fields, ...staticsCondition };
    }

    if (subcategoriesArray) {
      const subcategoriesCondition = {
        subCategories: {
          id: In(subcategoriesArray),
        },
      };
      fields = { ...fields, ...subcategoriesCondition };
    }
    const jobs = await this.jobRepository.find({
      where: fields,
      select: ['id'],
    });
    const ids = [];
    for (const job of jobs) {
      ids.push(job.id);
    }
    return await this.jobRepository.find({
      where: { id: In(ids) },
      relations: ['company', 'static', 'subCategories'],
      order: {
        company: {
          premiumLevel: 'DESC',
        },
      },
    });
  }




  //
  //   async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  //     const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['static', 'subcategory'] });
  //
  //     if (!employee) {
  //       throw new HttpException(`Employee with id ${id} not found`,HttpStatus.NOT_FOUND)
  //     }
  //     const categories = await this.staticRepository.find({ where: { id: In(updateEmployeeDto.categoryId) ,type: Type.Category} });
  //     const subcategories = await this.subCategoryRepository.find({ where: { id: In(updateEmployeeDto.subcategoryId) } });
  //     const levels = await this.staticRepository.find({ where: { id: In(updateEmployeeDto.levelId) ,type: Type.Level } });
  //     const jobtypes = await this.staticRepository.find({ where: { id: In(updateEmployeeDto.jobtypeId) ,type: Type.Job_type} });
  //
  //     employee.name = updateEmployeeDto.name;
  //     employee.email = updateEmployeeDto.email;
  //     employee.phone = updateEmployeeDto.phone;
  //     employee.gender = updateEmployeeDto.gender;
  //
  //     employee.static = [...categories, ...levels, ...jobtypes];
  //     employee.subcategory = subcategories;
  //     await this.employeeRepository.save(employee);
  //
  //     return  {
  //       id: employee.id,
  //       name: employee.name,
  //       email: employee.email,
  //       phone: employee.phone,
  //       gender: employee.gender,
  //       image: employee.image,
  //       resume: employee.resume,
  //       levels,
  //       jobtypes,
  //       categories,
  //       SubCategory: employee.subcategory
  //    }
  //
  // }
    async remove(id: number) {
      const employee = await this.employeeRepository.findOne({where:{id:id}});
      if (!employee) {
        throw new HttpException(`Employee with id ${id} not found`,HttpStatus.NOT_FOUND)
      }
      await this.employeeRepository.remove(employee);
      return {
        statusCode: 200,
        message: `Employee with id ${id} has been successfully removed`,
      };  }

  async activateJob(activateJobDto:ActivateJobDto){
    const job =await this.jobRepository.findOne({where:{id:activateJobDto.job_id}})

    if (!job) {
      throw new NotFoundException(`Job with id ${activateJobDto.job_id} not found`) //it returns the message with 201 status
    }
    if(job.active){
      throw new BadRequestException('job already activated') //it returns the message with 201 status
    }

    job.active = true

    await this.jobRepository.update(job.id,job)

    return 'Job activated successfully'
  }



}

