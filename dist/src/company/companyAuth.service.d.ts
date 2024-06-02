import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { RequestActivationCodeDto } from './dto/request-activation-code.dto';
import { ActivateCompanyDto } from './dto/activate-company.dto';
export declare class CompanyAuthService {
    private companyRepository;
    private jwtService;
    constructor(companyRepository: Repository<Company>, jwtService: JwtService);
    register(createCompanyDto: CreateCompanyDto): Promise<string | Tokens>;
    requestActivationCode(requestActivationCodeDto: RequestActivationCodeDto): Promise<string | Tokens>;
    activateAccount(activateCompanyDto: ActivateCompanyDto): Promise<Tokens>;
    login(loginCompanyDto: LoginCompanyDto): Promise<Tokens>;
    logout(company_id: any): Promise<{
        message: string;
    }>;
    refreshTokens(company_id: number, rt: string): Promise<Tokens>;
    private hashData;
    private getTokens;
    private updateRefreshToken;
    private generateRandomCode;
}
