import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { AtGuardSuperAdmin } from '../super-admin/strategies/decorate-guards';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @UseGuards(AtGuardSuperAdmin)
  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelsService.create(createLevelDto);
  }

  @Get()
  findAll() {
    return this.levelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelsService.findOne(+id);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelsService.update(+id, updateLevelDto);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelsService.remove(+id);
  }
}
