import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from './entities/super-admin.entity';


@Injectable()
export class SuperAdminAuthService {
  constructor(@InjectRepository(SuperAdmin) private superAdminRepository: Repository<SuperAdmin>,
              private jwtService: JwtService){}


  async login(loginsuperadmindto: LoginSuperAdminDto) {
    const superAdmin = await this.superAdminRepository.findOne(
      { where: { email: loginsuperadmindto.email } });

    if (!superAdmin)
      throw new ForbiddenException('Email Does not exist');

    const passwordMatches = await bcrypt.compare(loginsuperadmindto.password, superAdmin.hashed_password);

    if (passwordMatches) {
      const AccessToken = await this.getToken(superAdmin);
      return AccessToken;
    }
    throw new ForbiddenException('Wrong Password');
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
}
