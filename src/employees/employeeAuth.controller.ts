import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { EmployeeAuthService } from './employeeAuth.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { Request } from 'express';
import { EmployeeAtGuard, EmployeeRtGuard } from './strategies/decorate-guards';
import { Tokens } from './types/tokens.type';
import { ActivateEmployeeDto } from './dto/activate-employee.dto';
import { RequestActivationCodeDto } from './dto/request-activation-code.dto';


@Controller('employeeAuth')
export class EmployeeAuthController {
  constructor(private readonly employeesService: EmployeeAuthService) {
  }



  @Post('register')
  register(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.register(createEmployeeDto);
  }

  @Post('requestActivationCode')
  requestActivationCode(@Body() requestActivationCodeDto:RequestActivationCodeDto){
    return this.employeesService.requestActivationCode(requestActivationCodeDto)
  }
  @Post('activate')
  activateAccount(@Body() activateEmployeeDto: ActivateEmployeeDto) {
    return this.employeesService.activateAccount(activateEmployeeDto);
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
