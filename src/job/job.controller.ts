import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CompanyAtGuard } from '../company/strategies/decorate-guards';
import { Request } from 'express';
import { AtGuardSuperAdmin } from '../super-admin/strategies/decorate-guards';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(CompanyAtGuard)
  @Post()
  create(@Req() request: Request, @Body() createJobDto: CreateJobDto) {
    const user = request.user;
    const companyId=user['id'];
    return this.jobService.create(createJobDto,companyId)
  }
//
//
  @Get()
  findAll() {
    return this.jobService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string ) {
    return this.jobService.findOne(+id);
  }
//
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
//     return this.jobService.update(+id, updateJobDto);
//   }
//
  @UseGuards(AtGuardSuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
