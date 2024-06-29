import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query, Post } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { AtGuardSuperAdmin } from './strategies/decorate-guards';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';
import { ActivateJobDto } from './dto/update-super-admin.dto';


@Controller('superAdmin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Get()
  findAll() {
    return this.superAdminService.findAll();
  }

  @Get('jobs')
  jobs(@Query() fields?: any) {
    return this.superAdminService.jobs(fields);
  }

  @Get('jobs/:id')
  findOneJob(@Param('id') id: string) {
    const fields ={id : id}
    return this.superAdminService.jobs(fields);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superAdminService.findOne(+id);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Post('activate_job')
  activateJob(@Body() activateJobDto:ActivateJobDto) {
    return this.superAdminService.activateJob(activateJobDto)
  }



// @UseGuards(AtGuardSuperAdmin)
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
//     return this.superAdminService.update(+id, updateEmployeeDto);
//   }
  //
  @UseGuards(AtGuardSuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superAdminService.remove(+id);
  }








}
