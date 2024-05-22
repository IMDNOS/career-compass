import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { AtGuardSuperAdmin } from './strategies/decorate-guards';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';


@Controller('superAdmin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  // @Get()
  // findAll() {
  //   return this.superAdminService.findAll();
  // }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.superAdminService.findOne(+id);
  // }

// @UseGuards(AtGuardSuperAdmin)
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
//     return this.superAdminService.update(+id, updateEmployeeDto);
//   }
//   @UseGuards(AtGuardSuperAdmin)
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.superAdminService.remove(+id);
//   }


}
