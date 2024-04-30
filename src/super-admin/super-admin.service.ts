import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class SuperAdminService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
              private jwtService: JwtService){}

  async login(loginsuperadmindto: LoginSuperAdminDto) {
    const superAdmin = await this.employeeRepository.findOne(
      { where: { email: loginsuperadmindto.email } });

    if (!superAdmin)
      throw new ForbiddenException('Email Does not exist');

    const passwordMatches = await bcrypt.compare(loginsuperadmindto.password, superAdmin.hashed_password);

    if (passwordMatches) {
      const tokens = await this.getTokens(superAdmin);
      await this.updateAccessToken(superAdmin.id, tokens.access_token);
      return tokens;
    }

    throw new ForbiddenException('Wrong Password');
  }


  private async getTokens(superAdmin: Employee) {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: superAdmin.id,
          name: superAdmin.name,
          email: superAdmin.email,
        },
        {
          secret: 'super-admin',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
    };
  }

  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  private async updateAccessToken(id: number, at: string) {
    const hash = await this.hashData(at);

    const newData = {
      hashed_password: hash,
    };

    await this.employeeRepository.update({ id: id }, newData);
  }


  ///////////////////////////////////////////////////////////////////////////
  // create(createSuperAdminDto: LoginSuperAdminDto) {
  //   return 'This action adds a new superAdmin';
  // }


  async findAll() {
    return await this.employeeRepository.find({
      relations:{
        category:true,
        subCategory:true
      },
      select: ["id", "name", "email", "image", "resume", "gender" ]
    });
  }


  async findOne(id: number) {
    const user = await this.employeeRepository.findOne({
      where: {
        id
      },
      relations:{
        category:true,
        subCategory:true
      },
      select: ["id", "name", "email", "image", "resume", "gender"]
    });
    if (!user) {
      throw new ForbiddenException('User not found ')
    }
    return user;
  }










  // update(id: number, updateSuperAdminDto: UpdateSuperAdminDto) {
  //   return `This action updates a #${id} superAdmin`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} superAdmin`;
  // }


}
