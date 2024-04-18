import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {
  }

  @Post('register')
  register(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.register(createEmployeeDto);
  }

  @Post('login')
  login(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.employeesService.login(loginEmployeeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request) {
    const employee = req.user;
    return this.employeesService.logout(employee['id']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refreshTokens(@Req() req:Request) {
    const employee=req.user
    return  this.employeesService.refreshTokens(employee['id'],employee['refreshToken']);
  }

}
