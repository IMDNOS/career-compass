import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaticsService } from './statics.service';
import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';
import { AtGuardSuperAdmin } from '../super-admin/strategies/decorate-guards';

@Controller('statics')
export class StaticsController {
  constructor(private readonly staticsService: StaticsService) {}

  @UseGuards(AtGuardSuperAdmin)
  @Post()
  create(@Body() createStaticDto: CreateStaticDto) {
    return this.staticsService.create(createStaticDto);
  }
  
  // @Get('levels')
  // async getLevels() {
  //   return this.staticsService.findAllLevels();
  // }

  // @Get('job-types')
  // async getJobTypes() {
  //   return this.staticsService.findAllJobTypes();
  // }

  // @Get('categories')
  // async getCategories() {
  //   return this.staticsService.findAllCategories();
  // }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticsService.findOne(+id);
  }

  @Get()
  async getAllStatics(){
    return this.staticsService.findAllStatics();
  }

   //get all subcategories of a category
   @Get('get_subcategories/:id')
   async getSubcategoriesOfCategory(@Param('id') id: string) {
     return this.staticsService.getSubcategoriesOfCategory(+id);
   }

  //
  // @UseGuards(AtGuardSuperAdmin)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStaticDto: UpdateStaticDto) {
  //   return this.staticsService.update(+id, updateStaticDto);
  // }
  //
  @UseGuards(AtGuardSuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staticsService.remove(+id);
  }
}
