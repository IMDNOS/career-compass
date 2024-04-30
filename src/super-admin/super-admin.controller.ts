import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
// import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { AtGuard } from './strategies/decorate-guards';




@Controller('superAdmin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}


  @Post('login')
  login(@Body() loginsuperadmindto: LoginSuperAdminDto) {
    return this.superAdminService.login(loginsuperadmindto);
  }

  // @Post()
  // create(@Body() createSuperAdminDto: LoginSuperAdminDto) {
  //   return this.superAdminService.create(createSuperAdminDto);
  // }

  @UseGuards(AtGuard)
  @Get()
  findAll() {
    return this.superAdminService.findAll();
  }

  @UseGuards(AtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superAdminService.findOne(+id);
  }















  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSuperAdminDto: UpdateSuperAdminDto) {
  //   return this.superAdminService.update(+id, updateSuperAdminDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.superAdminService.remove(+id);
  // }
}
