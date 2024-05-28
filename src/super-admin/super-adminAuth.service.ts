import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from './entities/super-admin.entity';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { ActivateSuperAdmin, MakeManagerDto } from './dto/activate-super-admin';


@Injectable()
export class SuperAdminAuthService {
  constructor(@InjectRepository(SuperAdmin) private superAdminRepository: Repository<SuperAdmin>,
              private jwtService: JwtService) {
  }

  async register(createSuperAdminDto: CreateSuperAdminDto) {
    const superAdminCheck = await this.superAdminRepository.findOne({ where: { email: createSuperAdminDto.email } });

    if (superAdminCheck) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashData(createSuperAdminDto.password);

    const superAdmin = this.superAdminRepository.create({
      email: createSuperAdminDto.email,
      hashed_password: hashedPassword,
    });

    return await this.superAdminRepository.save(superAdmin);
  }


  async login(loginSuperAdminDto: LoginSuperAdminDto) {
    const superAdmin = await this.superAdminRepository.findOne(
      { where: { email: loginSuperAdminDto.email } });

    if (!superAdmin)
      throw new ForbiddenException('Email Does not exist');

    const passwordMatches = await bcrypt.compare(loginSuperAdminDto.password, superAdmin.hashed_password);

    if (passwordMatches) {
      const AccessToken = await this.getToken(superAdmin);
      return AccessToken;
    }
    throw new ForbiddenException('Wrong Password');
  }


  async activate(activateSuperAdmin: ActivateSuperAdmin) {

    const superAdmin = await this.superAdminRepository.findOne(
      { where: { email: activateSuperAdmin.email } });

    if (!superAdmin)
      throw new HttpException('email does not exist', HttpStatus.BAD_REQUEST);

    superAdmin.active = true;

    await this.superAdminRepository.save(superAdmin);

    return 'activated successfully';
  }

  async makeManager(makeManagerDto: MakeManagerDto) {

    const superAdmin = await this.superAdminRepository.findOne(
      { where: { email: makeManagerDto.email } });

    if (!superAdmin)
      throw new HttpException('email does not exist', HttpStatus.BAD_REQUEST);

    superAdmin.manager = true;

    await this.superAdminRepository.save(superAdmin);

    return 'manager authorities granted successfully';
  }


  private async getToken(superAdmin: SuperAdmin) {
    if (!superAdmin.active)
      throw new HttpException('account is not activated', HttpStatus.UNAUTHORIZED);

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
