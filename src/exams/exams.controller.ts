import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { AtGuardSuperAdmin } from '../super-admin/strategies/decorate-guards';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Get()
  findAll(@Query() fields?: any) {
    return this.examsService.findAll(fields);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(+id, updateExamDto);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }
}
