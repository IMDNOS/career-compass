import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { In, Repository } from 'typeorm';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';
import { Category } from '../categories/entities/category.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Level } from '../levels/entities/level.entity';
import { JobType } from '../job-types/entities/job-type.entity';



@Injectable()
export class SuperAdminService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
              @InjectRepository(Category) private categoryRepository: Repository<Category>,
              @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
              @InjectRepository(Level) private levelRepository: Repository<Level>,
              @InjectRepository(JobType) private jobTypeRepository: Repository<JobType>){}

  async findAll() {
    return await this.employeeRepository.find({
      relations:{
        category:true,
        subcategory:true,
        level:true,
        jobtype:true
      },
      select: ["id", "name", "email","phone", "image", "resume", "gender" ]
    });
  }


  async findOne(id: number) {
    const user = await this.employeeRepository.findOne({ where:{id:id},
      relations:{
        category:true,
        subcategory:true,
        level:true,
        jobtype:true
      },
      select: ["id", "name", "email", "phone" , "image", "resume", "gender"]
    });
    if (!user) {
      return {
        statusCode: 400,
        message: 'Bad Request: No such user found',
      };
    }
    return {
      statusCode: 200,
      message: user
    };
  }


  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const user = await this.employeeRepository.findOne({ where: { id: id },
      relations: ['category','subcategory','level' ,'jobtype'] });

    if (!user) {
      return {
        statusCode: 400,
        message: 'Bad Request: No such user found',
      };
    }
    const categories = await this.categoryRepository.find({
      where: { id: In(updateEmployeeDto.categoryId) }
    });
    const subcategories = await this.subCategoryRepository.find({
      where: { id: In(updateEmployeeDto.subcategoryId) }
    });
    const levels = await this.levelRepository.find({
      where: { id: In(updateEmployeeDto.levelId) }
    });
    const jobtypes = await this.jobTypeRepository.find({
      where: { id: In(updateEmployeeDto.jobtypeId) }
    });
    console.log(categories)
    user.category = categories;
    user.subcategory = subcategories;
    user.level = levels;
    user.jobtype = jobtypes;

    return this.employeeRepository.save(user);
  }


  async remove(id: number) {
    const user = await this.employeeRepository.findOne({where:{id:id}});
    if (!user) {
      return {
        statusCode: 400,
        message: 'Bad Request: No such user found',
      };
    }
    await this.employeeRepository.remove(user);
    return {
      statusCode: 200,
      message: `user with id ${id} has been successfully removed`,
    };  }


}

