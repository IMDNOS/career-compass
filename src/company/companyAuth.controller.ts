import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyAuthService } from './companyAuth.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import { Request } from 'express';
import { CompanyAtGuard, CompanyRtGuard } from './strategies/decorate-guards';
import { PeekCompanyDto } from './dto/peek-company.dto';


@Controller('companyAuth')
export class CompanyAuthController {
  constructor(private readonly companyAuthService: CompanyAuthService) {
  }

  @Post('peek')
  peek(@Body() peekCompanyDto:PeekCompanyDto){
    return this.companyAuthService.peek(peekCompanyDto)
  }

  @Post('register')
  register(@Body() createCompanyDto: CreateCompanyDto){
    return  this.companyAuthService.register(createCompanyDto);
  }

  @Post('login')
  login(@Body() loginCompanyDto: LoginCompanyDto) {
    return this.companyAuthService.login(loginCompanyDto);
  }

  @UseGuards(CompanyAtGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const company = req.user;
    return this.companyAuthService.logout(company['id']);
  }

  @UseGuards(CompanyRtGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const company = req.user;
    return this.companyAuthService.refreshTokens(company['id'], company['refreshToken']);
  }

}