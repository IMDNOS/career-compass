import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Job } from '../job/entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';

import { ApplyToJobDto } from '../employees/dto/apply-to-job.dto';
import { Employee } from '../employees/entities/employee.entity';
import { Employee_job } from '../job/entities/employee_job.entity';
import { RequestPremiumDto } from './dto/request-premium.dto';
import { AdminNotifications } from '../super-admin/entities/admin-notifications.entity';
import { EmployeesService } from '../employees/employees.service';
import { NotificationTokenCompany } from './entities/company-notification-token.entity';
import { NotificationsCompany } from './entities/notification-company.entity';
import { NotificationDto } from '../employees/dto/create-notification.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Employee_job) private readonly employee_jobRepository: Repository<Employee_job>,
    @InjectRepository(AdminNotifications) private readonly adminNotificationsRepository: Repository<AdminNotifications>,
    @InjectRepository(NotificationTokenCompany) private readonly companyNotificationTokenRepository: Repository<NotificationTokenCompany> ,
    @InjectRepository(NotificationsCompany) private readonly companyNotificationsRepository: Repository<NotificationsCompany>,

    ) {
  }


  async saveLogo(file: Express.Multer.File, companyId: number) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException(`Employee with ID ${companyId} not found`);
    }

    company.logo = `${file.filename}`;

    await this.companyRepository.save(company);

    return { ...company };
  }


  async getlogo(companyId: number) {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const companyImagePath = `uploadsimages/${company.logo}`;

    if (company.logo === null) {
      throw new BadRequestException('Logo not provided');
    }

    return companyImagePath;
  }

  async findAllJobs(companyID: number): Promise<Job[]> {

    return this.jobRepository.find({
      where: { company: { id: companyID }, active: true },
      relations: ['static', 'subCategories'],
      select: ['id', 'title', 'company', 'description', 'salary', 'work_hours', 'experience_years', 'wanted_gender'],
    });
  }

  async findOneJobById(id: number, companyID: number): Promise<Job[]> {
    return await this.jobRepository.find({
      where: { id: id, company: { id: companyID }, active: true }, // Filter by company ID,
      relations: ['static', 'subCategories'],
      select: ['id', 'title', 'company', 'description', 'salary', 'work_hours', 'experience_years', 'wanted_gender'],
    });
  }


  async getEmployeesApplying(companyId: number, jobId: number) {
    const Company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!Company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const Job = await this.jobRepository.findOne({
      where: { id: jobId, company: Company },
    });

    if (!Job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    const employeeJobs = await this.employee_jobRepository.find({
      where: {
        job: Job,
        accepted: false,
      },
      relations: ['employee', 'job'],
    });

    if (!employeeJobs || employeeJobs.length === 0) {
      throw new NotFoundException(`No employees applying for job with ID ${jobId} found`);
    }

    return employeeJobs;
  }


  async getEmployeesAccepted(companyId: number, jobId: number) {
    const Company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!Company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const Job = await this.jobRepository.findOne({ where: { id: jobId, company: Company } });
    if (!Job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    const employeesJob = await this.employee_jobRepository.find({
      where: {
        job: Job,
        accepted: true,
      },
      relations: ['employee', 'job'],
    });

    if (!employeesJob || employeesJob.length === 0) {
      throw new NotFoundException(`No employees accepted for job with ID ${jobId} found`);
    }

    return employeesJob;
  }


  async employeeAcceptance(id: number, companyId: number, job: ApplyToJobDto) {
    const Company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!Company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const employee = await this.employeeRepository.findOne({ where: { id: id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    const Job = await this.jobRepository.findOne({ where: { id: job.job_id, company: Company } });
    if (!Job) {
      throw new NotFoundException(`Job with ID ${job.job_id} not found`);
    }

    // التحقق من عدد الموظفين المقبولين حاليًا لهذه الوظيفة
    const acceptedEmployeesCount = await this.employee_jobRepository.count({
      where: {
        job: Job,
        accepted: true,
      },
    });

    if (acceptedEmployeesCount == Job.number_of_employees) {
      throw new BadRequestException(`The number of accepted employees for job with ID ${job.job_id} has reached its limit`);
    }

    const employeeJob = await this.employee_jobRepository.findOne({
      where: {
        employee: employee,
        job: Job,
      },
    });

    if (!employeeJob) {
      throw new NotFoundException(`Application for employee with ID ${id} for job with ID ${job.job_id} not found`);
    }

    employeeJob.accepted = true;
    await this.employee_jobRepository.save(employeeJob);

    return {
      message: 'The employee has been successfully accepted.',
      employeeJob: employeeJob,
    };
  }

  async premiumRequest(companyId:number,requestPremiumDto: RequestPremiumDto) {
    const company = await this.companyRepository.findOne({where: { id: companyId }});
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const message = `The company with ID ${companyId} requested a premium level ${requestPremiumDto.premiumLevel}.`;

    const notification = this.adminNotificationsRepository.create({
      company: company,
      body:message
    })

    return await this.adminNotificationsRepository.save(notification);
  }


//   update(id: number, updateCompanyDto: UpdateCompanyDto) {
//     return `This action updates a #${id} company`;
//   }
//
//   remove(id: number) {
//     return `This action removes a #${id} company`;
//   }

  async getInfoCompany(company_id: number) {
    return await this.companyRepository.findOne({
      where: { id: company_id },
      select: [
        'company_name',
        'email',
        'phone',
        'address',
        'description',
        'logo',
        'premiumLevel',
        'wallet',
      ]
    });
  }


  async updateCompany(updateCompanyDto: UpdateCompanyDto, companyId: number){
    try{
      if (!updateCompanyDto || Object.keys(updateCompanyDto).length === 0) {
        throw new HttpException('Empty request', HttpStatus.BAD_REQUEST);
      }
      const company = await this.employeeRepository.findOne({
        where: { id: companyId },
      });
      if (!company) {
        return { message: 'Company not found' };
      }
      updateCompanyDto.email = company.email;

      const saveInfo= await this.employeeRepository.save(company);
      // if (saveInfo) {
      //   // send push notification
      //   await this.sendAndSavePushNotificationCompany(
      //     saveInfo,
      //     'Profile Update',
      //     'Your Profile have been updated successfully'
      //   )
      //     .catch((e: any) => {
      //       console.log('Error sending push notification', e);
      //     });
      // }

      return  await this.employeeRepository.findOne({
        where: { id: companyId },
      });
    }
    catch (error) {
      return error;
    }

  }

  
  ///
  async saveNotificationTokenCompany(companyId: number, notificationDto: NotificationDto ){
    const company= await this.companyRepository.findOne({ where: { id: companyId } });

    let notificationToken = await this.companyNotificationTokenRepository.findOne({
      where: { company: { id: companyId } }
    });

    if (!notificationToken) {
      notificationToken = this.companyNotificationTokenRepository.create({
        company: company,
        device_type: notificationDto.device_type,
        notification_token: notificationDto.notification_token
      });
      await this.companyNotificationTokenRepository.save(notificationToken);
    }
    else {
      notificationToken.device_type = notificationDto.device_type;
      notificationToken.notification_token = notificationDto.notification_token;
      await this.companyNotificationTokenRepository.save(notificationToken);
    }
    return notificationToken;
  };



  async getNotificationsForCompany(companyId: number)
  {
    return await this.companyNotificationsRepository.find({
      where: {
        notificationTokenCompany: {
          company: {
            id: companyId,
          },
        },
      },
    });
  }

  async sendAndSavePushNotificationCompany(company: any, title: string, body: string) {
    try {
      const notificationTokenCompany = await this.companyNotificationTokenRepository.findOne({
        where: { company: { id: company.id } }
      });

      if (!notificationTokenCompany) {
        throw new ForbiddenException('Notification token for the company not found.');
      }

      const newNotification = this.companyNotificationsRepository.create({
        notificationTokenCompany: notificationTokenCompany,
        title,
        body,
      });

      await this.companyNotificationsRepository.save(newNotification);

      await firebase
        .messaging()
        .send({
          notification: { title, body },
          token: notificationTokenCompany.notification_token,
          android: { priority: 'high' },
        })
        .catch((error: any) => {
          console.error('Error sending push notification:', error);
        });
    } catch (error) {
      console.error('Error in sendAndSavePushNotification method:', error);
      throw error;
    }
  }
  
  
  

}
