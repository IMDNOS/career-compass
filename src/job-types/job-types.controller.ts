import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobTypesService } from './job-types.service';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';
import { AtGuardSuperAdmin } from '../super-admin/strategies/decorate-guards';

@Controller('job-types')
export class JobTypesController {
  constructor(private readonly jobTypesService: JobTypesService) {}

  @UseGuards(AtGuardSuperAdmin)
  @Post()
  create(@Body() createJobTypeDto: CreateJobTypeDto) {
    return this.jobTypesService.create(createJobTypeDto);
  }

  @Get()
  findAll() {
    return this.jobTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobTypesService.findOne(+id);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobTypeDto: UpdateJobTypeDto) {
    return this.jobTypesService.update(+id, updateJobTypeDto);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobTypesService.remove(+id);
  }
}
