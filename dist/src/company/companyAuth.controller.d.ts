import { CompanyAuthService } from './companyAuth.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import { Request } from 'express';
export declare class CompanyAuthController {
    private readonly companyAuthService;
    constructor(companyAuthService: CompanyAuthService);
    register(createCompanyDto: CreateCompanyDto): Promise<import("./types/tokens.type").Tokens>;
    login(loginCompanyDto: LoginCompanyDto): Promise<import("./types/tokens.type").Tokens>;
    logout(req: Request): Promise<{
        message: string;
    }>;
    refreshTokens(req: Request): Promise<import("./types/tokens.type").Tokens>;
}
