import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ActivateEmployeeDto } from './dto/activate-employee.dto';
import { RequestActivationCodeDto } from './dto/request-activation-code.dto';
import { EmailSender } from '../mail-sender';
import { PostNewPasswordDto } from './dto/post-new-password.dto';


@Injectable()
export class EmployeeAuthService {

  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
              private jwtService: JwtService,
              private readonly mailSender:EmailSender,
              ) {
  }


  async register(createEmployeeDto: CreateEmployeeDto) {

    const employeeCheck = await this.employeeRepository.findOne({ where: { email: createEmployeeDto.email } });

    if (employeeCheck) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashData(createEmployeeDto.password);


    const employee = this.employeeRepository.create({
      name: createEmployeeDto.name,
      email: createEmployeeDto.email,
      hashed_password: hashedPassword,
      phone: createEmployeeDto.phone,
      gender: createEmployeeDto.gender,
      home_address: createEmployeeDto.home_address,
      birthday_date: createEmployeeDto.birthday_date,
      description: createEmployeeDto.description,
    });

    await this.employeeRepository.save(employee);

    return this.requestActivationCode({ email: createEmployeeDto.email });
  }

  async requestActivationCode(requestActivationCodeDto: RequestActivationCodeDto) {
    const employee = await this.employeeRepository.findOne({ where: { email: requestActivationCodeDto.email } });

    if (employee) {
      // if (!employee.active) {
        const newCode = this.generateRandomCode();
        const newHash = this.hashData(newCode);

        employee.hashedCode = await newHash;

        await this.employeeRepository.update(employee.id, employee);

        return newCode;

         // return  await this.mailSender.mailTransport(employee.email,'Your Career Compass activation code',`<strong>Your acrtivation code is <br> ${newCode} </strong>`)



      // } else {
      //   return await this.getTokens(employee);
      // }
    } else {
      throw new HttpException('Email does not exists', HttpStatus.BAD_REQUEST);
    }
  }

  async activateAccount(activateEmployeeDto: ActivateEmployeeDto) {
    const employee = await this.employeeRepository.findOne(
      { where: { email: activateEmployeeDto.email } });

    if (!employee)
      throw new ForbiddenException('Email Does not exist');

    const codeMatches = await bcrypt.compare(activateEmployeeDto.activationCode, employee.hashedCode);


    if (codeMatches) {
      employee.active = true;
      await this.employeeRepository.update(employee.id, employee);

      const tokens = await this.getTokens(employee);
      await this.updateRefreshToken(employee.id, tokens.refresh_token);
      return tokens;
    }

    throw new ForbiddenException('Wrong Code');

  }


  async login(loginEmployeeDto: LoginEmployeeDto) {
    const employee = await this.employeeRepository.findOne(
      { where: { email: loginEmployeeDto.email } });

    if (!employee)
      throw new ForbiddenException('Email Does not exist');

    const passwordMatches = await bcrypt.compare(loginEmployeeDto.password, employee.hashed_password);

    if (passwordMatches) {
      const tokens = await this.getTokens(employee);
      await this.updateRefreshToken(employee.id, tokens.refresh_token);
      return tokens;
    }

    throw new ForbiddenException('Wrong Password');
  }

  async logout(employee_id: number) {
    await this.employeeRepository.update(
      {
        id: employee_id,
      },
      { hashedRT: null },
    );
    return { 'message': 'refresh token deleted successfully' };
  }


  async refreshTokens(employee_id: number, rt: string) {
    const employee = await this.employeeRepository.findOne({
      where: {
        id: employee_id,
      },
    });
    if (!employee)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, employee.hashedRT);
    if (!rtMatches)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(employee);
    await this.updateRefreshToken(employee.id, tokens.refresh_token);
    return tokens;
  }


async post_new_password(postNewPasswordDto:PostNewPasswordDto){
    const employee = await this.employeeRepository.findOne({where: {email: postNewPasswordDto.email}});

    if (!employee)
    {
      throw new ForbiddenException('Email Does not exist');
    }

  const codeMatches = await bcrypt.compare(postNewPasswordDto.activationCode, employee.hashedCode);

    if (codeMatches) {
      const hashedPassword = await this.hashData(postNewPasswordDto.password);
      employee.hashed_password=hashedPassword;
      await this.employeeRepository.update(employee.id, employee);
      return 'password updated successfully';
    }

    throw new ForbiddenException('Wrong Code');


}





  // private methods
  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(employee: Employee): Promise<Tokens> {

    if (!employee.active)
      throw new HttpException('account is not activated', HttpStatus.UNAUTHORIZED);

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          gender: employee.gender,
        },
        {
          secret: 'employee_at_secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
      this.jwtService.signAsync(
        {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          gender: employee.gender,
        },
        {
          secret: 'employee_rt_secret',
          expiresIn: 60 * 60 * 24 * 7,

        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }


  private async updateRefreshToken(user_id: number, rt: string) {
    const hash = await this.hashData(rt);

    const newData = {
      hashedRT: hash,
    };

    await this.employeeRepository.update({ id: user_id }, newData);
  }

  private generateRandomCode(): string {
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
  }

}
