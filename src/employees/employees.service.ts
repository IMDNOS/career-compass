import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { StaticDto, StaticsDto, SubcategoriesDto } from './dto/add-statics.dto';
import { Static } from '../statics/entities/static.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Static)
    private readonly staticRepository: Repository<Static>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {
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

  async setStatics(employeeId: number, staticsDto: StaticsDto) {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    employee.static = [];

    for (const staticDto of staticsDto.items) {
      const staticEntity = await this.staticRepository.findOne({ where: { name: staticDto.name } });
      if (staticEntity) {
        employee.static.push(staticEntity);
      }
    }


    return await this.employeeRepository.save(employee);
  }

  async getStatics(employeeId: number) {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId }, relations: ['static'] });


    return employee.static;

  }


  async setSubcategories(employeeId: number, subcategoriesDto: SubcategoriesDto) {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    employee.subcategory = [];


    for (const staticDto of subcategoriesDto.items) {
      const subcategoryEntity = await this.subCategoryRepository.findOne({ where: { name: staticDto.name } });
      if (subcategoryEntity) {
        employee.subcategory.push(subcategoryEntity);
      }
    }

    return this.employeeRepository.save(employee);
  }

  async getSubcategories(employeeId: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['subcategory'],
    });

    return employee.subcategory;
  }
}