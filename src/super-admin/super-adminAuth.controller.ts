import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuperAdminAuthService } from './super-adminAuth.service';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { AtGuardSuperAdmin } from './strategies/decorate-guards';
import { ManagerGuard } from './strategies/manager-guard';


@Controller('superAdminAuth')
export class SuperAdminAuthController {
  constructor(private readonly superAdminAuthService: SuperAdminAuthService) {
  }


  @Post('login')
  login(@Body() loginSuperAdminDto: LoginSuperAdminDto) {
    return this.superAdminAuthService.login(loginSuperAdminDto);
  }
  @UseGuards(AtGuardSuperAdmin, ManagerGuard)
  @Post('create_admin')
  createAdmin(@Body() createSuperAdminDto:CreateSuperAdminDto){
    return this.superAdminAuthService.createAdmin(createSuperAdminDto);
  }


}
