import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from './entities/super-admin.entity';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';


@Injectable()
export class SuperAdminAuthService {
  constructor(@InjectRepository(SuperAdmin) private superAdminRepository: Repository<SuperAdmin>,
              private jwtService: JwtService) {
  }


  async login(loginSuperAdminDto: LoginSuperAdminDto) {
    const superAdmin = await this.superAdminRepository.findOne(
      { where: { email: loginSuperAdminDto.email } });

    if (!superAdmin)
      throw new ForbiddenException('Email Does not exist');

    const passwordMatches = await bcrypt.compare(loginSuperAdminDto.password, superAdmin.hashed_password);

    if (passwordMatches) {
      const AccessToken = await this.getToken(superAdmin);
      delete superAdmin.hashed_password
      return {...superAdmin,...AccessToken}
    }
    throw new ForbiddenException('Wrong Password');
  }

  async createAdmin(createSuperAdminDto:CreateSuperAdminDto){

    const superAdminCheck = await this.superAdminRepository.findOne({ where: { email: createSuperAdminDto.email } });

      if (superAdminCheck) {
        throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await this.hashData(createSuperAdminDto.password);

      const admin = this.superAdminRepository.create({
        name: createSuperAdminDto.name,
        email: createSuperAdminDto.email,
        hashed_password: hashedPassword,
        age:createSuperAdminDto.age,
        location: createSuperAdminDto.location,
      });

      return await this.superAdminRepository.save(admin);

  }





  private async getToken(superAdmin: SuperAdmin) {

    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: superAdmin.id,
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
}
