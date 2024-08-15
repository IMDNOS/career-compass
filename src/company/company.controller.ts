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
  UploadedFile, Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyAtGuard } from './strategies/decorate-guards';
import { Express, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApplyToJobDto } from '../employees/dto/apply-to-job.dto';
import { RequestPremiumDto } from './dto/request-premium.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { NotificationDto } from '../employees/dto/create-notification.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {
  }


  @UseGuards(CompanyAtGuard)
  @Get('get_logo')
  getImage(@Req() req: Request) {
    const id = req.user['id'];
    return this.companyService.getlogo(id);
  }

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

  @UseGuards(CompanyAtGuard)
  @Get('getAllEmployeeApplying/:id')
  getAllEmployeeApplying(@Req() request: Request, @Param('id') jobId: string) {
    const company = request.user;
    const companyId = company['id'];
    return this.companyService.getEmployeesApplying(companyId, +jobId);
  }

  @UseGuards(CompanyAtGuard)
  @Get('getAllEmployeeAccepted/:id')
  getAllEmployeeAccepted(@Req() request: Request, @Param('id') jobId: string) {
    const company = request.user;
    const companyId = company['id'];
    return this.companyService.getEmployeesAccepted(companyId, +jobId);
  }


  @UseGuards(CompanyAtGuard)
  @Patch('employeeAcceptance/:id')
  employeeAccepted(@Req() request: Request, @Param('id') id: string, @Body() JobDto: ApplyToJobDto) {
    const company = request.user;
    const companyId = company['id'];
    return this.companyService.employeeAcceptance(+id, companyId, JobDto);
  }

  @UseGuards(CompanyAtGuard)
  @Get('')
  findAll(@Req() request: Request) {
    const company = request.user;
    const companyId = company['id'];
    return this.companyService.findAllJobs(companyId);
  }

  @UseGuards(CompanyAtGuard)
  @Get('get_info_company')
  getInfo(@Req() req: Request) {
    const id = req.user['id'];
    return this.companyService.getInfoCompany(id);
  }

  // @UseGuards(CompanyAtGuard)
  // @Put('update_company')
  // update(@Body() updateCompanyDto: UpdateCompanyDto, @Req() req: Request) {
  //   const id = req.user['id'];
  //   return this.companyService.updateCompany(updateCompanyDto,id);
  // }




  @UseGuards(CompanyAtGuard)
  @Post('premium_request')
  premiumRequest(@Req() request: Request, @Body() requestPremiumDto: RequestPremiumDto) {
    const company = request.user;
    const companyId = company['id'];
    return this.companyService.premiumRequest(companyId,requestPremiumDto)
  }

  @UseGuards(CompanyAtGuard)
  @Get('get-notifications-company')
  GetNotificationCompany(@Req() req: Request) {
    // return 'hello';
    const company = req.user;
    const companyId = company['id'];
    return this.companyService.getNotificationsForCompany(+companyId);
  }



  @UseGuards(CompanyAtGuard)
  @Post('save-notificationToken-company')
  saveNotificationTokenCompany(@Body() notificationDto:NotificationDto,@Req() req: Request) {
    const id = req.user['id'];
    return this.companyService.saveNotificationTokenCompany(id, notificationDto)
  }

  @UseGuards(CompanyAtGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    const company = request.user;
    const companyId = company['id'];
    return this.companyService.findOneJobById(+id, companyId);
  }

}
