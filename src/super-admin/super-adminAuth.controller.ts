import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuperAdminAuthService } from './super-adminAuth.service';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { AtGuardSuperAdmin } from './strategies/decorate-guards';
import { ManagerGuard } from './strategies/manager-guard';
import { ActivateSuperAdmin, MakeManagerDto } from './dto/activate-super-admin';


@Controller('superAdminAuth')
export class SuperAdminAuthController {
  constructor(private readonly superAdminAuthService: SuperAdminAuthService) {
  }


  @Post('register')
  register(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.superAdminAuthService.register(createSuperAdminDto);
  }

  @Post('login')
  login(@Body() loginSuperAdminDto: LoginSuperAdminDto) {
    return this.superAdminAuthService.login(loginSuperAdminDto);
  }

  @UseGuards(AtGuardSuperAdmin, ManagerGuard)
  @Post('activate')
  activate(@Body() activateSuperAdmin: ActivateSuperAdmin) {
    return this.superAdminAuthService.activate(activateSuperAdmin);
  }
  @UseGuards(AtGuardSuperAdmin, ManagerGuard)
  @Post('make_manager')
  makeManager(@Body() makeManagerDto: MakeManagerDto) {
    return this.superAdminAuthService.makeManager(makeManagerDto);
  }


}
