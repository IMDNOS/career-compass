import { Request } from 'express';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeAtGuard } from './strategies/decorate-guards';
import { EmployeesService } from './employees.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('employees')
export class EmployeesController {

  constructor(private readonly employeesService: EmployeesService) {
  }


  @UseGuards(EmployeeAtGuard)
  @Get('get_info')
  getInfo(@Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.getInfo(id);
  }


  @UseGuards(EmployeeAtGuard)
  @Put('update')
  update(@Body() updateEmployeeDto: UpdateEmployeeDto, @Req() req: Request) {
    const id = req.user['id'];


    return this.employeesService.update(updateEmployeeDto, id);
  }

  @UseGuards(EmployeeAtGuard)
  @Post('set_statics')
  setStatics(@Body() staticsDto: { name: string }[], @Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.setStatics(id, staticsDto);
  }

  @UseGuards(EmployeeAtGuard)
  @Get('get_statics')
  getStatics(@Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.getStatics(id);
  }

  @UseGuards(EmployeeAtGuard)
  @Post('set_subcategories')
  setSubcategories(@Body() subcategoriesDto: { name: string }[], @Req() req: Request) {

    const id = req.user['id'];
    return this.employeesService.setSubcategories(id, subcategoriesDto);
  }


  @Get('get_subcategories')
  getSubcategories(@Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.getSubcategories(id);
  }

  @UseGuards(EmployeeAtGuard)
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploadsImages',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.saveImage(file, id);
  }

  @UseGuards(EmployeeAtGuard)
  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploadsFiles',
      filename: (req, file, cb) => {
        const randomName = Array(34).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const id = req.user['id'];
    return this.employeesService.saveFile(file, id);
  }


}