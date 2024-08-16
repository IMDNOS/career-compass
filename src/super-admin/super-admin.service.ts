import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { In, Repository } from 'typeorm';
import { Static, Type } from 'src/statics/entities/static.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { Job } from '../job/entities/job.entity';
import { ActivateJobDto, ChargeWalletDto, SetPremiumCompany } from './dto/admin-dtos.dto';
import { Company } from '../company/entities/company.entity';
import { EmployeeSubCategory } from '../employees/entities/employeeSubcategory.entity';
import { SuperAdmin } from './entities/super-admin.entity';
import { AdminNotifications } from './entities/admin-notifications.entity';
import {Employee_job} from "../job/entities/employee_job.entity";
import * as firebase from "firebase-admin";
import {NotificationsCompany} from "../company/entities/notification-company.entity";
import {NotificationTokenCompany} from "../company/entities/company-notification-token.entity";
import {NotificationsEmployee} from "../employees/entities/notification-employee.entity";
import {NotificationTokenEmployee} from "../employees/entities/employee-notification-token.entity";

@Injectable()
export class SuperAdminService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
              @InjectRepository(Static) private staticRepository: Repository<Static>,
              @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
              @InjectRepository(Job) private jobRepository: Repository<Job>,
              @InjectRepository(EmployeeSubCategory) private employeeSubCategoryRepository: Repository<EmployeeSubCategory>,
              @InjectRepository(Employee_job) private employee_jobRepository: Repository<Employee_job>,
              @InjectRepository(SuperAdmin) private superAdminRepository: Repository<SuperAdmin>,
              @InjectRepository(AdminNotifications) private adminNotificationsRepository: Repository<AdminNotifications>,
              @InjectRepository(Company) private companyRepository: Repository<Company>,
              @InjectRepository(NotificationsCompany) private readonly notificationsCompanyRepository: Repository<NotificationsCompany>,
              @InjectRepository(NotificationTokenCompany) private readonly notificationTokenCompanyRepository:Repository<NotificationTokenCompany>,
  ) {
  }

  async findAllCompanies(){
    const companies= await this.companyRepository.find();
    return companies;
  }

  async findOneCompanyById(companyId:number) {
    const company = await this.companyRepository.find({where: {id: companyId}});
    return company;
  }


  async findAllEmployees() {
    const employees = await this.employeeRepository.find({
      relations: ['static'],
    });

    const employeeSubCategories = await this.employeeSubCategoryRepository.find({
      relations: ['employee', 'subcategory'],
    });

    return employees.map(employee => {
      const levels = employee.static.filter(staticItem => staticItem.type === Type.Level);
      const jobTypes = employee.static.filter(staticItem => staticItem.type === Type.Job_type);
      const categories = employee.static.filter(staticItem => staticItem.type === Type.Category);
      const subcategories = employeeSubCategories.filter(es => es.employee.id === employee.id)
        .map(es => es.subcategory);

      return {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        gender: employee.gender,
        image: employee.image,
        resume: employee.resume,
        levels,
        jobTypes,
        categories,
        subcategories,
      };
    });
  }

  async findOneEmployeeById(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id: id },
      relations: ['static']
    });

    if (!employee) {
      throw new HttpException(`Employee with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const employeeSubCategories = await this.employeeSubCategoryRepository.find({
      relations: ['employee', 'subcategory'],
    });

    const levels = employee.static.filter(staticItem => staticItem.type === Type.Level);
    const jobTypes = employee.static.filter(staticItem => staticItem.type === Type.Job_type);
    const categories = employee.static.filter(staticItem => staticItem.type === Type.Category);
    const subcategories = employeeSubCategories.filter(es => es.employee.id === employee.id)
      .map(es => es.subcategory);

    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      gender: employee.gender,
      image: employee.image,
      resume: employee.resume,
      levels,
      jobTypes,
      categories,
      subcategories, // Corrected subcategory mapping
    };
  }


  async NumberOfCompanies() {
    const numCompanies = await this.companyRepository.count();
    return numCompanies;
  }

  async NumberOfEmployees() {
    const numEmployees = await this.employeeRepository.count();
    return numEmployees;
  }

  async NumberOfJobs() {
    const numJobs = await this.jobRepository.count();
    return numJobs;
  }

  async countEmployeesByGovernorate(): Promise<{ [governorate: string]: number }> {
    const result = await this.employeeRepository
        .createQueryBuilder('employee')
        .select("SUBSTRING_INDEX(SUBSTRING_INDEX(employee.home_address, ' / ', 2), ' / ', -1)", 'governorate')
        .addSelect('COUNT(employee.id)', 'count')
        .groupBy("SUBSTRING_INDEX(SUBSTRING_INDEX(employee.home_address, ' / ', 2), ' / ', -1)")
        .getRawMany();

    const counts: { [governorate: string]: number } = {};
    result.forEach(row => {
      counts[row.governorate] = parseInt(row.count, 10);
    });

    return counts;
  }


  async getTopThreeJobsWithMostApplicants() {
    const jobsWithApplicantsCount = await this.employee_jobRepository
        .createQueryBuilder('employeeJob')
        .innerJoinAndSelect('employeeJob.job', 'job')
        .select('job.id', 'jobId')
        .addSelect('job.title', 'title')
        .addSelect('job.description', 'description')
        .addSelect('job.salary', 'salary')
        .addSelect('job.work_hours', 'workHours')
        .addSelect('job.number_of_employees', 'numberOfEmployees')
        .addSelect('job.experience_years', 'experienceYears')
        .addSelect('job.wanted_gender', 'wantedGender')
        .addSelect('job.active', 'active')
        .addSelect('COUNT(employeeJob.employee)', 'applicantsCount')
        .groupBy('job.id')
        .orderBy('applicantsCount', 'DESC')
        .limit(3)
        .getRawMany();

    return jobsWithApplicantsCount;
  }



  async jobs(fields?: any) {
    let staticsArray;

    if (fields && fields.statics) {
      staticsArray = fields.statics.split(',').map(Number);
      delete fields.statics;
    }

    let subcategoriesArray;
    if (fields && fields.subcategories) {
      subcategoriesArray = fields.subcategories.split(',').map(Number);
      delete fields.subcategories;
    }

    if (staticsArray) {
      const staticsCondition = {
        static: {
          id: In(staticsArray),
        },
      };
      fields = { ...fields, ...staticsCondition };
    }

    if (subcategoriesArray) {
      const subcategoriesCondition = {
        subCategories: {
          id: In(subcategoriesArray),
        },
      };
      fields = { ...fields, ...subcategoriesCondition };
    }
    const jobs = await this.jobRepository.find({
      where: fields,
      select: ['id'],
    });
    const ids = [];
    for (const job of jobs) {
      ids.push(job.id);
    }
    return await this.jobRepository.find({
      where: { id: In(ids) },
      relations: ['company', 'static', 'subCategories'],
      order: {
        company: {
          premiumLevel: 'DESC',
        },
      },
    });
  }


  //   async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  //     const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['static', 'subcategory'] });
  //
  //     if (!employee) {
  //       throw new HttpException(`Employee with id ${id} not found`,HttpStatus.NOT_FOUND)
  //     }
  //     const categories = await this.staticRepository.find({ where: { id: In(updateEmployeeDto.categoryId) ,type: Type.Category} });
  //     const subcategories = await this.subCategoryRepository.find({ where: { id: In(updateEmployeeDto.subcategoryId) } });
  //     const levels = await this.staticRepository.find({ where: { id: In(updateEmployeeDto.levelId) ,type: Type.Level } });
  //     const jobtypes = await this.staticRepository.find({ where: { id: In(updateEmployeeDto.jobtypeId) ,type: Type.Job_type} });
  //
  //     employee.name = updateEmployeeDto.name;
  //     employee.email = updateEmployeeDto.email;
  //     employee.phone = updateEmployeeDto.phone;
  //     employee.gender = updateEmployeeDto.gender;
  //
  //     employee.static = [...categories, ...levels, ...jobtypes];
  //     employee.subcategory = subcategories;
  //     await this.employeeRepository.save(employee);
  //
  //     return  {
  //       id: employee.id,
  //       name: employee.name,
  //       email: employee.email,
  //       phone: employee.phone,
  //       gender: employee.gender,
  //       image: employee.image,
  //       resume: employee.resume,
  //       levels,
  //       jobtypes,
  //       categories,
  //       SubCategory: employee.subcategory
  //    }
  //
  // }
  async remove(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id: id } });
    if (!employee) {
      throw new HttpException(`Employee with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await this.employeeRepository.remove(employee);
    return {
      statusCode: 200,
      message: `Employee with id ${id} has been successfully removed`,
    };
  }

  async activateJob(activateJobDto: ActivateJobDto) {
    const job = await this.jobRepository.findOne({
      where: { id: activateJobDto.job_id },
      relations: ['company'], // Ensure the company is loaded with the job
    });

    if (!job) {
      throw new NotFoundException(`Job with id ${activateJobDto.job_id} not found`);
    }

    if (job.active) {
      throw new BadRequestException('Job is already activated');
    }

    const company = job.company;

    if (!company) {
      throw new NotFoundException('Associated company not found');
    }

    const activationCost = 25;
    if (company.wallet < activationCost) {
      throw new BadRequestException('Insufficient wallet balance for activation');
    }
    company.wallet -= activationCost;

    job.active = true;
    await this.jobRepository.save(job);
    await this.companyRepository.save(company);

    // Send a push notification to the company
    try {
      await this.sendAndSavePushNotificationCompany(
          company,
          'Job Activated',
          `The job titled "${job.title}" has been successfully activated and deployed.`,
      );
    } catch (error) {
      console.log('Error sending push notification', error);
    }

    return { message: 'Job activated successfully' };
  }



  async chargeWallet(chargeWalletDto: ChargeWalletDto) {
    const company = await this.companyRepository.findOne({ where: { id: chargeWalletDto.companyId } });

    if (!company) {
      throw new NotFoundException(`Company with id ${chargeWalletDto.companyId} not found`);
    }

    const oldBalance = company.wallet;
    company.wallet += chargeWalletDto.money;

    await this.companyRepository.save(company);

    try {
      await this.sendAndSavePushNotificationCompany(
          company,
          'Wallet Charged',
          `Your wallet has been successfully charged with ${chargeWalletDto.money} units. Your new balance is ${company.wallet}.`,
      );
    } catch (error) {
      console.error('Error sending push notification', error);
    }

    return {
      oldBalance,
      newBalance: company.wallet,
    };
  }


  async setPremiumLevel(setPremiumCompany: SetPremiumCompany) {
    const company = await this.companyRepository.findOne({ where: { id: setPremiumCompany.companyId } });

    if (!company) {
      throw new NotFoundException(`Company with id ${setPremiumCompany.companyId} not found`);
    }

    company.premiumLevel = setPremiumCompany.premiumLevel;

    await this.companyRepository.save(company);

    try {
      await this.sendAndSavePushNotificationCompany(
          company,
          'Premium Level Updated',
          `Your premium level has been set to ${company.premiumLevel}. Enjoy the new benefits!`,
      );
    } catch (error) {
      console.error('Error sending push notification', error);
    }

    return `Company premium level was set to ${company.premiumLevel}`;
  }

 async getAllAdmins(){
    return this.superAdminRepository.find({select:['id','name','email','age','location','manager']})
 }

 async getMyInfo(id:number){
    const admin = await this.superAdminRepository.findOne({ where: { id: id } });
    return admin
 }


 async getNotifications(){
    const notifications = await this.adminNotificationsRepository.find({
      relations: ['company','employee'],
      order:{date:'DESC'}
    })

   return notifications
 }


 async getCertifications() {
   const employeeSubCategories = await this.employeeSubCategoryRepository.find({relations:['subcategory','employee']})
   return employeeSubCategories
 }


  async sendAndSavePushNotificationCompany(company: any, title: string, body: string) {
    try {
      const notificationTokenCompany = await this.notificationTokenCompanyRepository.findOne({
        where: { company: { id: company.id } }
      });

      if (!notificationTokenCompany) {
        throw new ForbiddenException('Notification token for the company not found.');
      }

      const newNotification = this.notificationsCompanyRepository.create({
        notificationTokenCompany: notificationTokenCompany,
        title,
        body,
      });

      await this.notificationsCompanyRepository.save(newNotification);

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

