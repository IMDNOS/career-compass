import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class EmployeesService {

  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
              private jwtService: JwtService) {
  }

  async register(createEmployeeDto: CreateEmployeeDto) {
    const hashedPassword = await this.hashData(createEmployeeDto.password);
    // return this.employeeRepository.save(createEmployeeDto);
    const employee = this.employeeRepository.create({
      name: createEmployeeDto.name,
      email: createEmployeeDto.email,
      hashed_password: hashedPassword,
      gender: createEmployeeDto.gender,
    });

    await this.employeeRepository.save(employee);

    const tokens = await this.getTokens(employee);
    await this.updateRefreshToken(employee.id, tokens.refresh_token);

    return tokens;
  }


  async login(loginEmployeeDto: LoginEmployeeDto) {
    const employee = await this.employeeRepository.findOne({ where: { email: loginEmployeeDto.email } });

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
    return await this.employeeRepository.update(
      {
        id: employee_id,
      },
      { hashedRT: null },
    );
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


  // private methods
  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(employee: Employee): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          gender: employee.gender,
        },
        {
          secret: 'at_secret',
          expiresIn: 60 * 15,
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
          secret: 'rt_secret',
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


}
