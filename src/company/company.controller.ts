import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyAtGuard } from './strategies/decorate-guards';
// import { UpdateCompanyDto } from './dto/update-company.dto';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { CompanyAtGuard } from './strategies/decorate-guards';
import { Express, Request } from 'express';
import { EmployeeAtGuard } from '../employees/strategies/decorate-guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}


  @UseGuards(CompanyAtGuard)
  @Post('upload-logo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploadsImages',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadLogo(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const id = req.user['id'];
    return this.companyService.saveLogo(file, id);
  }

//   @Post()
//   create(@Body() createCompanyDto: CreateCompanyDto) {
//     return this.companyService.create(createCompanyDto);
//   }
//
  @UseGuards(CompanyAtGuard)
  @Get('')
  findAll(@Req() request: Request) {
    const company = request.user;
    const companyId=company['id']
    return this.companyService.findAll(companyId);
  }

  @UseGuards(CompanyAtGuard)
  @Get(':id')
  findOne(@Param('id') id: string ,@Req() request: Request) {
    const company = request.user;
    const companyId=company['id']
    return this.companyService.findOne(+id,companyId);
  }
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
