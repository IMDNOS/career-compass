import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { EmployeeAuthService } from './employeeAuth.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Request } from 'express';
import { EmployeeAtGuard, EmployeeRtGuard } from './strategies/decorate-guards';
import { Tokens } from './types/tokens.type';
import { PeekEmployeeDto } from './dto/peek-employee.dto';


@Controller('employeeAuth')
export class EmployeeAuthController {
  constructor(private readonly employeesService: EmployeeAuthService) {
  }

  @Post('peek')
  peek(@Body() peekEmployeeDto:PeekEmployeeDto){
    return this.employeesService.peek(peekEmployeeDto)
  }


  @Post('register')
  register(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Tokens> {
    return this.employeesService.register(createEmployeeDto);
  }

  @Post('login')
  login(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.employeesService.login(loginEmployeeDto);
  }

  @UseGuards(EmployeeAtGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const employee = req.user;
    return this.employeesService.logout(employee['id']);
  }

  @UseGuards(EmployeeRtGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const employee = req.user;
    return this.employeesService.refreshTokens(employee['id'], employee['refreshToken']);
  }
}
