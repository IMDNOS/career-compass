import { Controller, Get, Body, Param, Delete, UseGuards, Query, Post, Req } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { AtGuardSuperAdmin } from './strategies/decorate-guards';
import { ActivateJobDto, ChargeWalletDto, SetPremiumCompany } from './dto/admin-dtos.dto';
import { Request } from 'express';


@Controller('superAdmin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {
  }

  @Get('getAllEmployees')
  findAll() {
    return this.superAdminService.findAllEmployees();
  }

  @Get('getEmployee/:id')
  findOneEmployeeById(@Param('id') id: string) {
    return this.superAdminService.findOneEmployeeById(+id);
  }

  @Get('getAllCompanies')
  findAllCompanies() {
    return this.superAdminService.findAllCompanies();
  }

  @Get('getCompany/:id')
  findOneCompanyById(@Param('id') id: string) {
    return this.superAdminService.findOneCompanyById(+id);
  }

  @Get('jobs')
  jobs(@Query() fields?: any) {
    return this.superAdminService.jobs(fields);
  }

  @Get('jobs/:id')
  findOneJob(@Param('id') id: string) {
    const fields = { id: id };
    return this.superAdminService.jobs(fields);
  }


  @UseGuards(AtGuardSuperAdmin)
  @Post('activate_job')
  activateJob(@Body() activateJobDto: ActivateJobDto) {
    return this.superAdminService.activateJob(activateJobDto);
  }


// @UseGuards(AtGuardSuperAdmin)
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
//     return this.superAdminService.update(+id, updateEmployeeDto);
//   }

  @UseGuards(AtGuardSuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superAdminService.remove(+id);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Post('charge_wallet')
  chargeWallet(@Body() chargeWalletDto: ChargeWalletDto) {
    return this.superAdminService.chargeWallet(chargeWalletDto);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Post('set_premium_level')
  setPremiumLevel(@Body() setPremiumCompany: SetPremiumCompany) {
    return this.superAdminService.setPremiumLevel(setPremiumCompany);
  }

  @Get('admins')
  getAllAdmins() {
    return this.superAdminService.getAllAdmins();
  }

  @UseGuards(AtGuardSuperAdmin)
  @Get('getMyInfo')
  getMyInfo(@Req() req: Request) {
    const id = req.user['id'];
    return this.superAdminService.getMyInfo(id);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Get('getNotifications')
  getNotifications() {
    return this.superAdminService.getNotifications()
  }



  @UseGuards(AtGuardSuperAdmin)
  @Get('get_certifications')
  getCertifications(){
    return this.superAdminService.getCertifications();
  }
}
