import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { EmployeeAuthService } from './employeeAuth.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard } from './strategies/decorate-guards';
import { Tokens } from './types/tokens.type';


@Controller('employeeAuth')
export class EmployeeAuthController {
  constructor(private readonly employeesService: EmployeeAuthService) {
  }

  @Post('register')
  register(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Tokens> {
    return this.employeesService.register(createEmployeeDto);
  }

  @Post('login')
  login(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.employeesService.login(loginEmployeeDto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const employee = req.user;
    return this.employeesService.logout(employee['id']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const employee = req.user;
    return this.employeesService.refreshTokens(employee['id'], employee['refreshToken']);
  }
}
