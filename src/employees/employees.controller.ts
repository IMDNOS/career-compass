import { Request } from 'express';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeAtGuard } from './strategies/decorate-guards';
import { EmployeesService } from './employees.service';
import { Body, Controller, Post, UseGuards, Req, Get, Put, Param } from '@nestjs/common';
import { StaticDto, StaticsDto, SubcategoriesDto } from './dto/add-statics.dto';


@Controller('employees')
export class EmployeesController {

  constructor(private readonly employeesService: EmployeesService) {
  }


  @UseGuards(EmployeeAtGuard)
  @Get('get_info')
  getInfo(@Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.getInfo(id);
  }


  @UseGuards(EmployeeAtGuard)
  @Put('update')
  update(@Body() updateEmployeeDto: UpdateEmployeeDto, @Req() req: Request) {
    const id = req.user['id'];


    return this.employeesService.update(updateEmployeeDto, id);
  }

  @UseGuards(EmployeeAtGuard)
  @Post('set_statics')
  setStatics(@Body() staticsDto: StaticsDto, @Req() req: Request) {

    const id = req.user['id'];
    return this.employeesService.setStatics(id, staticsDto);
  }

  @UseGuards(EmployeeAtGuard)
  @Get('get_statics')
  getStatics(@Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.getStatics(id);
  }

  @UseGuards(EmployeeAtGuard)
  @Post('set_subcategories')
  setSubcategories(@Body() subcategoriesDto: SubcategoriesDto, @Req() req: Request) {

    const id = req.user['id'];
    return this.employeesService.setSubcategories(id, subcategoriesDto);
  }

  @UseGuards(EmployeeAtGuard)
  @Get('get_subcategories')
  getSubcategories(@Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.getSubcategories(id);
  }


}