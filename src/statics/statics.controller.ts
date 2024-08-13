import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StaticsService } from './statics.service';
import { CreateStaticDto } from './dto/create-static.dto';
import { AtGuardSuperAdmin } from '../super-admin/strategies/decorate-guards';
import { UpdateStaticDto } from './dto/update-static.dto';

@Controller('statics')
export class StaticsController {
  constructor(private readonly staticsService: StaticsService) {
  }


  @UseGuards(AtGuardSuperAdmin)
  @Post()
  create(@Body() createStaticDto: CreateStaticDto) {
    return this.staticsService.create(createStaticDto);
  }


  @Get()
  async getAllStatics() {
    return this.staticsService.findAllStatics();
  }

  @Get('all_categories')
  getAllCategories() {
    return this.staticsService.getAllCategories()
  }


  //get all subcategories of a category
  @Get('get_subcategories/:id')
  async getSubcategoriesOfCategory(@Param('id') id: string) {
    return this.staticsService.getSubcategoriesOfCategory(+id);
  }


  @Get('get_their_subcategories')
  async getSubcategoriesOfCategories(@Query() categoriesArray?: any) {
    return this.staticsService.getSubcategoriesOfCategories(categoriesArray);
  }


  @UseGuards(AtGuardSuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaticDto: UpdateStaticDto) {
    return this.staticsService.update(+id, updateStaticDto);
  }

  @UseGuards(AtGuardSuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staticsService.remove(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticsService.findOne(+id);
  }

}
