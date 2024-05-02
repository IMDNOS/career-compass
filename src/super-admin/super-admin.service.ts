import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';


@Injectable()
export class SuperAdminService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

  async findAll() {
    return await this.employeeRepository.find({
      relations:{
        category:true,
        subcategory:true
      },
      select: ["id", "name", "email", "image", "resume", "gender" ]
    });
  }


  async findOne(id: number) {
    const user = await this.employeeRepository.findOne({
      where: {
        id
      },
      relations:{
        category:true,
        subcategory:true
      },
      select: ["id", "name", "email", "image", "resume", "gender"]
    });
    if (!user) {
      throw new ForbiddenException('User not found ')
    }
    return user;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const user = await this.employeeRepository.findOne({
      where:{id}
    })
    if (!user) {
      throw new NotFoundException('user not found');
    }
     Object.assign(user, updateEmployeeDto);

    return this.employeeRepository.save(user);

  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.employeeRepository.remove(user);
  }

}
