import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompanyAuthService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>,
              private jwtService: JwtService) {
  }

  async register(createCompanyDto: CreateCompanyDto) {
    const hashedPassword = await this.hashData(createCompanyDto.password);
    const company = this.companyRepository.create({
      company_name: createCompanyDto.company_name,
      email: createCompanyDto.email,
      hashed_password: hashedPassword,
      location: createCompanyDto.location,
      description: createCompanyDto.description,
    });
    await this.companyRepository.save(company);

    const tokens = await this.getTokens(company);
    await this.updateRefreshToken(company.id, tokens.refresh_token);

    return tokens;
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
    const employee = await this.companyRepository.findOne({
      where: {
        id: company_id,
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

  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(company: Company): Promise<Tokens> {
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


}