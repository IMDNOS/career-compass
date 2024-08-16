import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { In, Repository } from 'typeorm';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Static, Type } from '../statics/entities/static.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Job } from '../job/entities/job.entity';
import { SetEducationAndExperienceDto } from './dto/set-education-and-experience.dto';
import { ApplyToJobDto } from './dto/apply-to-job.dto';
import { Employee_job } from '../job/entities/employee_job.entity';
import { EmployeeSubCategory } from './entities/employeeSubcategory.entity';
import { ApplyToExamDto } from './dto/apply-to-exam.dto';
import { Exam } from '../exams/entities/exam.entity';
import { PostExamResultDto } from './dto/post-exam-result.dto';
import { NotificationsEmployee } from './entities/notification-employee.entity';
import { NotificationTokenEmployee } from './entities/employee-notification-token.entity';
import * as firebase from 'firebase-admin';
import { NotificationDto } from './dto/create-notification.dto';
import { Company } from '../company/entities/company.entity';
import { NotificationsCompany } from '../company/entities/notification-company.entity';
import { NotificationTokenCompany } from '../company/entities/company-notification-token.entity';



@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Static)
    private readonly staticRepository: Repository<Static>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(Employee_job)
    private readonly employee_jobRepository: Repository<Employee_job>,
    @InjectRepository(EmployeeSubCategory)
    private employeeSubCategoryRepository: Repository<EmployeeSubCategory>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectRepository(NotificationsEmployee)
    private readonly notificationRepository: Repository<NotificationsEmployee>,
    @InjectRepository(NotificationTokenEmployee)
    private readonly notificationTokenRepository: Repository<NotificationTokenEmployee>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(NotificationsCompany)
    private readonly notificationsCompanyRepository: Repository<NotificationsCompany>,
    @InjectRepository(NotificationTokenCompany)
    private readonly notificationTokenCompanyRepository:Repository<NotificationTokenCompany>,

  ) {
  }

  async getInfo(employee_id: number) {
    return await this.employeeRepository.findOne({
      where: { id: employee_id },
      select: [
        'name',
        'email',
        'phone',
        'home_address',
        'birthday_date',
        'image',
        'resume',
        'gender',
      ],
    });
  }

  async update(updateEmployeeDto: UpdateEmployeeDto, employeeId: number) {
    try{
      if (!updateEmployeeDto || Object.keys(updateEmployeeDto).length === 0) {
        throw new HttpException('Empty request', HttpStatus.BAD_REQUEST);
      }
      let employee = await this.employeeRepository.findOne({
        where: { id: employeeId },
      });
      if (!employee) {
        return { message: 'Employee not found' };
      }

      employee.name = updateEmployeeDto.name || employee.name;
      employee.phone = updateEmployeeDto.phone || employee.phone;
      employee.description = updateEmployeeDto.description || employee.description;
      employee.home_address = updateEmployeeDto.home_address || employee.home_address;
      employee.gender=updateEmployeeDto.gender || employee.gender;
      employee.birthday_date=updateEmployeeDto.birthday_date || employee.birthday_date;
      updateEmployeeDto.email = employee.email;

      const saveInfo= await this.employeeRepository.save(employee)
      if (saveInfo) {
        // send push notification
        await this.sendAndSavePushNotificationForEmployee(
            saveInfo,
            'Profile Update',
            'Your Profile have been updated successfully'
        )
            .catch((e: any) => {
              console.log('Error sending push notification', e);
            });
      }

      employee = await this.employeeRepository.findOne({
        where: { id: employeeId },
      });
      return employee;
    }
    catch (error) {
      return error;
    }
  }

  async setStatics(employeeId: number, staticsDto: { name: string }[]) {

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['static'],
    });
    employee.static = [];

    for (const staticDto of staticsDto) {
      const staticEntity = await this.staticRepository.findOne({
        where: { name: staticDto.name },
      });
      if (staticEntity) {
        employee.static.push(staticEntity);
      }
    }
    await this.employeeRepository.save(employee);
    return employee.static;
  }

  async getStatics(employeeId: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['static'],
    });

    if (!employee) {
      throw new Error(`Employee with id ${employeeId} not found`);
    }

    const levels = employee.static.filter(
      (staticItem) => staticItem.type === Type.Level,
    );
    const jobTypes = employee.static.filter(
      (staticItem) => staticItem.type === Type.Job_type,
    );
    const categories = employee.static.filter(
      (staticItem) => staticItem.type === Type.Category,
    );

    return { levels, jobTypes, categories };
  }

  async setSubcategories(
    employeeId: number,
    subcategoriesDto: { name: string }[],
  ) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['static'],
    });

    if (!employee)
      throw new ForbiddenException(`Employee with id ${employeeId} not found`);

    await this.employeeSubCategoryRepository.delete({ employee: { id: employeeId } });

    const newEmployeeSubCategories = [];
    const newEmployeeStaticIds = new Set<number>();

    for (const subCategoryDto of subcategoriesDto) {
      const subcategoryEntity = await this.subCategoryRepository.findOne({
        where: { name: subCategoryDto.name },
        relations: ['category'],
      });

      if (subcategoryEntity) {
        const employeeSubCategory = new EmployeeSubCategory();
        employeeSubCategory.employee = employee;
        employeeSubCategory.subcategory = subcategoryEntity;

        newEmployeeSubCategories.push(employeeSubCategory);

        if (subcategoryEntity.category) {
          newEmployeeStaticIds.add(subcategoryEntity.category.id);
        }
      }
    }

    await this.employeeSubCategoryRepository.save(newEmployeeSubCategories);

    if (newEmployeeStaticIds.size > 0) {
      const newStatics = await this.staticRepository.find({ where: { id: In([...newEmployeeStaticIds]) } });
      employee.static.push(...newStatics);
      await this.employeeRepository.save(employee);
    }

    // const updatedEmployee = await this.employeeRepository.findOne({
    //   where: { id: employeeId },
    //   relations: ['static'],
    // });

    const employeeSubCategories = await this.employeeSubCategoryRepository.find({
      where: { employee: { id: employeeId } },
      relations: ['subcategory'],
    });

    return employeeSubCategories.map(es => es.subcategory);
  }


  // async getSubcategories(employeeId: number) {
  //   const employeeSubCategories = await this.employeeSubCategoryRepository.find({
  //     where: { employee: { id: employeeId } },
  //     relations: ['subcategory'],
  //   });
  //
  //   return employeeSubCategories.map(es => es.subcategory);
  // }
  // async getSubcategoriesFull(employeeId: number) {
  //   const employeeSubCategories = await this.employeeSubCategoryRepository.find({
  //     where: { employee: { id: employeeId } },
  //     relations: ['subcategory'],
  //   });
  //
  //   const today=new Date()
  //
  //   for (const employeeSubCategory of employeeSubCategories) {
  //     employeeSubCategory['can_apply'] = true;
  //
  //     if(!employeeSubCategory.last_apply)
  //       continue
  //
  //
  //     const timeDifference = today.getTime() - employeeSubCategory.last_apply.getTime();
  //     const daysDifference = timeDifference / (1000 * 3600 * 24);
  //
  //
  //
  //     if (daysDifference < 90) {
  //       employeeSubCategory['can_apply'] = false;
  //     }
  //
  //   }
  //
  //
  //   return employeeSubCategories
  // }


  async getSubcategoriesFull(employeeId: number) {
    const employeeSubCategories = await this.employeeSubCategoryRepository.find({
      where: { employee: { id: employeeId } },
      relations: ['subcategory'],
    });

    const today=new Date()

    for (const employeeSubCategory of employeeSubCategories) {
      employeeSubCategory['can_apply'] = true;

      if(!employeeSubCategory.last_apply)
        continue


      const timeDifference = today.getTime() - employeeSubCategory.last_apply.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);



      if (daysDifference < 90) {
        employeeSubCategory['can_apply'] = false;
      }

    }

    const modifiedEmployeeSubCategories = []

    for (const subCategory of employeeSubCategories) {
      const item={}
      item['id']=subCategory.subcategory.id
      item['name']=subCategory.subcategory.name
      item['certification']=subCategory.certification
      item['can_apply']=subCategory.subcategory.exam_available&&subCategory['can_apply']

      modifiedEmployeeSubCategories.push(item)
    }

    return modifiedEmployeeSubCategories

  }



  async setEducationAndExperience(
    id: number,
    setEducationAndExperienceDto: SetEducationAndExperienceDto,
  ) {
    const employee = await this.employeeRepository.findOne({
      where: { id: id },
    });

    if (!employee)
      throw new ForbiddenException(`Employee with id ${id} not found`);

    await this.employeeRepository.update(id, setEducationAndExperienceDto);

    const updatedEmployee = await this.employeeRepository.findOne({
      where: { id: id },
    });

    return updatedEmployee;
  }

  async saveImage(file: Express.Multer.File, employeeId: number) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    employee.image = `${file.filename}`;

    await this.employeeRepository.save(employee);

    return { ...employee };
  }

  async getimage(employeeId: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const employeeImagePath = `uploadsimages/${employee.image}`;

    if (employee.image === null) {
      throw new BadRequestException('image not provided');
    }

    return employeeImagePath;
  }


  async saveFile(file: Express.Multer.File, employeeId: number) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    employee.resume = `${file.filename}`;

    await this.employeeRepository.save(employee);

    return { ...employee };
  }

  async getresume(employeeId: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const employeeResumePath = `uploadsFiles/${employee.resume}`;

    if (employee.resume === null) {
      throw new BadRequestException('resume not provided');
    }

    return employeeResumePath;
  }

  async primalFilter(employeeId: number) {

    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const employeeWithStatics = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['static'],
    });

    // return employeeWithStatics

    const employeeStaticIds = employeeWithStatics.static.map(staticItem => staticItem.id);

    // return employeeStaticIds;

    const employeeSubCategories = await this.employeeSubCategoryRepository.find({
      where: { employee: { id: employeeId } },
      relations: ['subcategory'],
    });

    const employeeSubCategoryIds = employeeSubCategories.map(es => es.subcategory.id);

    // return employeeSubCategoryIds;

    const fields: any = { active: true };
    if (employeeStaticIds.length) {
      fields.static = { id: In(employeeStaticIds) };
    }
    if (employeeSubCategoryIds.length) {
      fields.subCategories = { id: In(employeeSubCategoryIds) };
    }


    const jobsIds = await this.jobRepository.find({
      where: fields,
      select: ['id'],
    });

    const ids = [];
    for (const job of jobsIds) {
      ids.push(job.id);
    }

    const jobs = await this.jobRepository.find({
      where: { id: In(ids) },
      relations: ['company', 'static', 'subCategories'],
      order: {
        company: {
          premiumLevel: 'DESC',
        },
      },
    });

    // return jobs

    return jobs.filter(job =>
        (!job.wanted_gender || job.wanted_gender === employee.gender)
        && (!job.experience_years || job.experience_years <= employee.experience),
      // && (!job.company.address || job.company.address === employee.home_address)
    );
  }


  async jobs(fields?: any) {
    fields.active = true;

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

  async applyForJob(employeeId: number, applyToJobDto: ApplyToJobDto) {
    const cheack=await this.employee_jobRepository.findOne({where:{employee:{id:employeeId}}})

    if (cheack){
      throw new ForbiddenException('You are applying on this job already')
    }
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });

    const job = await this.jobRepository.findOne({ where: { id: applyToJobDto.job_id } ,relations:['company']},);

    const employeeJob = this.employee_jobRepository.create({
      employee: employee,
      job: job,
    });

    // return await this.employee_jobRepository.save(employeeJob);

    const save =await this.employee_jobRepository.save(employeeJob);
    const company = await this.companyRepository.findOne({where:{id:job.company.id}})


    //send the company a notification

    if (save) {

      await this.sendAndSavePushNotificationCompany(
        company,
        'An employee applies for the job',
        `The employee with id : ${employeeId} applies for the job with id : ${job.id}`,
      )
        .catch((e: any) => {
          console.log('Error sending push notification', e);
        });
    }

    return save


  }

  async applyToExam(employeeId: number, applyToExamDto: ApplyToExamDto) {
    const employee = await this.employeeRepository.find({ where: { id: employeeId } });
    if (!employee) {
      throw new NotFoundException(`Company with ID ${employeeId} not found`);
    }


    const subcategory = await this.subCategoryRepository.findOne({ where: { id: applyToExamDto.subcategoryId } });
    if (!subcategory.exam_available) {
      throw new BadRequestException(`subcategory with ID ${applyToExamDto.subcategoryId} no exam_available`);
    }

    const employeeSubcategory = await this.employeeSubCategoryRepository.find({ where: { subcategory: subcategory } });

    const lastApply = employeeSubcategory[0].last_apply;

    const today = new Date();

    const daysSinceLastApply = lastApply ? Math.floor((today.getTime() - lastApply.getTime()) / (1000 * 3600 * 24)) : 100;


    if (daysSinceLastApply < 89) {
      throw new UnauthorizedException(`You have to wait ${90 - daysSinceLastApply} days more`);
    }

    const exam = await this.examRepository.find({ where: { subCategory: subcategory } });

    const shuffledExams = this.shuffleArray(exam);

    const slicedExams= shuffledExams.slice(0, 10);

    for (let i = 0; i < slicedExams.length; i++) {
      slicedExams[i]['subcategoryId']=subcategory.id
    }
    return slicedExams
  }

  async postExamResult(employeeId: number, postExamResultDto: PostExamResultDto) {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    if (!employee) {
      throw new NotFoundException(`Company with ID ${employeeId} not found`);
    }

    const subcategory = await this.subCategoryRepository.findOne({ where: { id: postExamResultDto.subcategoryId } });

    if (!subcategory) {
      throw new BadRequestException(`subcategory with ID ${subcategory.id} not found`);
    }


    if (postExamResultDto.result < 6) {
      postExamResultDto.result = null;
    } else {
      postExamResultDto.result *= 10;
    }

    const employeeSubcategory = await this.employeeSubCategoryRepository.findOne({
      where: {
        employee: employee,
        subcategory: subcategory,
      },
    });

    employeeSubcategory.last_apply = new Date();
    employeeSubcategory.certification = postExamResultDto.result;


    await this.employeeSubCategoryRepository.update(employeeSubcategory.id, employeeSubcategory);


    return await this.employeeSubCategoryRepository.findOne({
      where: {
        employee: employee,
        subcategory: subcategory,
      },
    });

  }

  async saveNotificationToken(employeeId: number, notificationDto: NotificationDto ){
    const employee= await this.employeeRepository.findOne({ where: { id: employeeId } });

    let notificationToken = await this.notificationTokenRepository.findOne({
      where: { employee: { id: employeeId } }
    });

    if (!notificationToken) {
      notificationToken = this.notificationTokenRepository.create({
        employee: employee,
        device_type: notificationDto.device_type,
        notification_token: notificationDto.notification_token
      });
      await this.notificationTokenRepository.save(notificationToken);
    }
    else {
      notificationToken.device_type = notificationDto.device_type;
      notificationToken.notification_token = notificationDto.notification_token;
      await this.notificationTokenRepository.save(notificationToken);
    }
    return notificationToken;
  };


  async getNotificationsForEmployee(employeeId: number) {
    return await this.notificationRepository.find({
      where: {
        notificationToken: {
          employee: {
            id: employeeId,
          },
        },
      },
    });
  }

  async sendAndSavePushNotificationForEmployee(employee: any, title: string, body: string) {
    try {
      const notificationTokenEmployee = await this.notificationTokenRepository.findOne({
        where: { employee: { id: employee.id } }
      });

      if (!notificationTokenEmployee) {
        throw new ForbiddenException('Notification token for the employee not found.');
      }

      const newNotification = this.notificationRepository.create({
        notificationToken: notificationTokenEmployee,
        title,
        body,
      });

      await this.notificationRepository.save(newNotification);

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








  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


}
