import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuperAdminAuthService } from './super-adminAuth.service';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';





@Controller('superAdminAuth')
export class SuperAdminAuthController {
  constructor(private readonly superAdminService: SuperAdminAuthService) {}


  @Post('login')
  login(@Body() loginsuperadmindto: LoginSuperAdminDto) {
    return this.superAdminService.login(loginsuperadmindto);
  }



}
