import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

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
}
