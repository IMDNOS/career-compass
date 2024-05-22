import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
// import { UpdateCompanyDto } from './dto/update-company.dto';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { CompanyAtGuard } from './strategies/decorate-guards';
// import { Request } from 'express';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

//   @Post()
//   create(@Body() createCompanyDto: CreateCompanyDto) {
//     return this.companyService.create(createCompanyDto);
//   }
//
//   @UseGuards(CompanyAtGuard)
//   @Get('')
//   findAll(@Req() request: Request) {
//     const company = request.user;
//     const companyId=company['id']
//     return this.companyService.findAll(companyId);
//   }
//
//   @UseGuards(CompanyAtGuard)
//   @Get(':id')
//   findOne(@Param('id') id: string ,@Req() request: Request) {
//     const company = request.user;
//     const companyId=company['id']
//     return this.companyService.findOne(+id,companyId);
//   }
//
//
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
//     return this.companyService.update(+id, updateCompanyDto);
//   }
//
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.companyService.remove(+id);
//   }
}
