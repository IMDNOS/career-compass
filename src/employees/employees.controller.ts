import { Request } from 'express';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeAtGuard } from './strategies/decorate-guards';
import { EmployeesService } from './employees.service';
import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';

@Controller('employees')
export class EmployeesController {

  constructor(private readonly employeesService: EmployeesService) {}

//   @UseGuards(EmployeeAtGuard)
//   @Post('update')
//   update(@Body() updateEmployeeDto: UpdateEmployeeDto, @Req() req: Request) {
//     const id = req.user['id'];
//
//
//     return this.employeesService.update(updateEmployeeDto, id);
//   }
}