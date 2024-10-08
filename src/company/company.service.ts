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
import { NotificationTokenCompany } from './entities/company-notification-token.entity';
import { NotificationsCompany } from './entities/notification-company.entity';
import { NotificationDto } from '../employees/dto/create-notification.dto';
import { NotificationsEmployee } from '../employees/entities/notification-employee.entity';
import { NotificationTokenEmployee } from '../employees/entities/employee-notification-token.entity';
import { EmployeeSubCategory } from '../employees/entities/employeeSubcategory.entity';

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
    @InjectRepository(NotificationsEmployee) private readonly notificationsEmployeeRepository: Repository<NotificationsEmployee>,
    @InjectRepository(NotificationTokenEmployee) private readonly notificationTokenEmployeeRepository: Repository<NotificationTokenEmployee>,
    @InjectRepository(EmployeeSubCategory)
    private employeeSubCategoryRepository: Repository<EmployeeSubCategory>,
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

  async findAllJobsNotActive(companyID: number): Promise<Job[]> {

    return this.jobRepository.find({
      where: { company: { id: companyID }, active: false },
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
      relations: ['employee'/*, 'job'*/],
    });

    if (!employeeJobs || employeeJobs.length === 0) {
      throw new NotFoundException(`No employees applying for job with ID ${jobId} found`);
    }
    // for (const employeeJob of employeeJobs) {
    //   delete employeeJob.employee.hashed_password
    //   delete employeeJob.employee.hashedRT
    //   delete employeeJob.employee.hashedCode
    //
    //   const employeeSubcategories= await this.employeeSubCategoryRepository.find({where:{employee:employeeJob.employee},relations:['subcategory']})
    //   for (const employeeSubcategory of employeeSubcategories) {
    //     employeeJob.employee[ employeeSubcategory.subcategory.name]=employeeSubcategory.certification
    //     if(!employeeSubcategory.certification)
    //     employeeJob.employee[ employeeSubcategory.subcategory.name]="unknown"
    //   }
    // }
    for (const employeeJob of employeeJobs) {
      delete employeeJob.employee.hashed_password;
      delete employeeJob.employee.hashedRT;
      delete employeeJob.employee.hashedCode;

      const certifications = [];

      const employeeSubcategories = await this.employeeSubCategoryRepository.find({
        where: { employee: employeeJob.employee },
        relations: ['subcategory'],
      });


      for (const employeeSubcategory of employeeSubcategories) {
        let mark = String(employeeSubcategory.certification);

        if (!mark)
          mark = 'unknown';

        certifications.push({
          'name': employeeSubcategory.subcategory.name,
          'mark': mark,
        });
      }
      employeeJob['certifications'] = certifications;
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
      relations: ['employee'/*, 'job'*/],
    });

    if (!employeesJob || employeesJob.length === 0) {
      throw new NotFoundException(`No employees accepted for job with ID ${jobId} found`);
    }

    // for (const employeeJob of employeesJob) {
    //   delete employeeJob.employee.hashed_password
    //   delete employeeJob.employee.hashedRT
    //   delete employeeJob.employee.hashedCode
    //
    //   const employeeSubcategories= await this.employeeSubCategoryRepository.find({where:{employee:employeeJob.employee},relations:['subcategory']})
    //   for (const employeeSubcategory of employeeSubcategories) {
    //     employeeJob.employee[ employeeSubcategory.subcategory.name]=employeeSubcategory.certification
    //     if(!employeeSubcategory.certification)
    //       employeeJob.employee[ employeeSubcategory.subcategory.name]="unknown"
    //   }
    // }
    for (const employeeJob of employeesJob) {
      delete employeeJob.employee.hashed_password;
      delete employeeJob.employee.hashedRT;
      delete employeeJob.employee.hashedCode;

      const certifications = [];

      const employeeSubcategories = await this.employeeSubCategoryRepository.find({
        where: { employee: employeeJob.employee },
        relations: ['subcategory'],
      });


      for (const employeeSubcategory of employeeSubcategories) {
        let mark = String(employeeSubcategory.certification);

        if (!mark)
          mark = 'unknown';

        certifications.push({
          'name': employeeSubcategory.subcategory.name,
          'mark': mark,
        });
      }
      employeeJob['certifications'] = certifications;
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
     const save= await this.employee_jobRepository.save(employeeJob);
    if (save) {

      await this.sendAndSavePushNotificationForEmployee(
        employee,
        'You have been accepted for the job',
        `Congratulations, you have been accepted for the job ${Job.title} you applied for some time ago`,
      )
        .catch((e: any) => {
          console.log('Error sending push notification', e);
        });
    }

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


  async updateCompany(updateCompanyDto: UpdateCompanyDto, companyId: number) {
    try {
      if (!updateCompanyDto || Object.keys(updateCompanyDto).length === 0) {
        throw new HttpException('Empty request', HttpStatus.BAD_REQUEST);
      }

      const company = await this.companyRepository.findOne({
        where: { id: companyId },
      });

      if (!company) {
        return { message: 'Company not found' };
      }

      company.company_name = updateCompanyDto.company_name || company.company_name;
      company.phone = updateCompanyDto.phone || company.phone;
      company.description = updateCompanyDto.description || company.description;
      company.address = updateCompanyDto.address || company.address;
      updateCompanyDto.email = company.email;

      const saveInfo = await this.companyRepository.save(company);
      if (saveInfo) {
        await this.sendAndSavePushNotificationCompany(
            saveInfo,
            'Profile Update',
            'Your Profile has been updated successfully'
        ).catch((e: any) => {
          console.log('Error sending push notification', e);
        });
      }

      return await this.companyRepository.findOne({
        where: { id: companyId },
      });
    } catch (error) {
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


 async inactivateJob(companyId: number,jobId:number){

    // const company = await this.companyRepository.findOne({where:{id: companyId}});
    //  if (!company) {
    //    throw new NotFoundException(`Company with ID ${companyId} not found`);
    //  }

     const job = await this.jobRepository.findOne({where:{id: jobId}});

     if (!job) {
       throw new NotFoundException(`Job with ID ${jobId} not found`);
     }

     job.active = false;

     await this.jobRepository.update(jobId,job)

    return 'job has been unactivated'
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


  async sendAndSavePushNotificationForEmployee(employee: any, title: string, body: string) {
    try {
      const notificationTokenEmployee = await this.notificationTokenEmployeeRepository.findOne({
        where: { employee: { id: employee.id } }
      });

      if (!notificationTokenEmployee) {
        throw new ForbiddenException('Notification token for the employee not found.');
      }

      const newNotification = this.notificationsEmployeeRepository.create({
        notificationToken: notificationTokenEmployee,
        title,
        body,
      });

      await this.notificationsEmployeeRepository.save(newNotification);

      await firebase
        .messaging()
        .send({
          notification: { title, body },
          token: notificationTokenEmployee.notification_token,
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
