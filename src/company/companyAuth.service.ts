import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { RequestActivationCodeDto } from './dto/request-activation-code.dto';
import { ActivateCompanyDto } from './dto/activate-company.dto';


@Injectable()
export class CompanyAuthService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>,
              private jwtService: JwtService) {}


  async register(createCompanyDto: CreateCompanyDto) {
    const hashedPassword = await this.hashData(createCompanyDto.password);
    const company = this.companyRepository.create({
      company_name: createCompanyDto.company_name,
      email: createCompanyDto.email,
      phone:createCompanyDto.phone,
      hashed_password: hashedPassword,
      address:createCompanyDto.address,
      description: createCompanyDto.description
    });
      await this.companyRepository.save(company);

    return this.requestActivationCode({ email: createCompanyDto.email });
  }


  async requestActivationCode(requestActivationCodeDto: RequestActivationCodeDto) {
    const company = await this.companyRepository.findOne({ where: { email: requestActivationCodeDto.email } });

    if (company) {
      if (!company.active) {
        const newCode = this.generateRandomCode();
        const newHash = this.hashData(newCode);

        company.hashedCode = await newHash;

        await this.companyRepository.update(company.id, company);

        return newCode;
      } else {
        return await this.getTokens(company);
      }
    } else {
      throw new HttpException('Email does not exists', HttpStatus.BAD_REQUEST);
    }
  }

  async activateAccount(activateCompanyDto: ActivateCompanyDto) {
    const company = await this.companyRepository.findOne(
      { where: { email: activateCompanyDto.email } });

    if (!company)
      throw new ForbiddenException('Email Does not exist');

    const codeMatches = await bcrypt.compare(activateCompanyDto.activationCode, company.hashedCode);
    company.active = true;
    await this.companyRepository.update(company.id, company);

    if (codeMatches) {
      const tokens = await this.getTokens(company);
      await this.updateRefreshToken(company.id, tokens.refresh_token);
      return tokens;
    }

    throw new ForbiddenException('Wrong Code');

  }

  async login(loginCompanyDto: LoginCompanyDto) {
    const company = await this.companyRepository.findOne(
      { where: { email: loginCompanyDto.email } });

    if (!company)
      throw new ForbiddenException('Email Does not exist');

    const passwordMatches = await bcrypt.compare(loginCompanyDto.password, company.hashed_password);

    if (passwordMatches) {
      const tokens = await this.getTokens(company);
      await this.updateRefreshToken(company.id, tokens.refresh_token);
      return tokens;
    }

    throw new ForbiddenException('Wrong Password');
  }

  async logout(company_id: any) {
    await this.companyRepository.update(
      {
        id: company_id,
      },
      { hashedRT: null },
    );
    return {'message':'refresh token deleted successfully'}

  }

  async refreshTokens(company_id: number, rt: string) {
    const company = await this.companyRepository.findOne({
      where: {
        id: company_id,
      },
    });
    if (!company)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, company.hashedRT);
    if (!rtMatches)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(company);
    await this.updateRefreshToken(company.id, tokens.refresh_token);
    return tokens;
  }

  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(company: Company): Promise<Tokens> {
    if (!company.active)
      throw new HttpException('account is not activated', HttpStatus.UNAUTHORIZED);


    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: company.id,
          company_name: company.company_name,
          email: company.email,
        },
        {
          secret: 'company_at_secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
      this.jwtService.signAsync(
        {
          id: company.id,
          company_name: company.company_name,
          email: company.email,
        },
        {
          secret: 'company_rt_secret',
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

    await this.companyRepository.update({ id: user_id }, newData);
  }

  private generateRandomCode(): string {
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
  }

}