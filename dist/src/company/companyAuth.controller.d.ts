import { CompanyAuthService } from './companyAuth.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import { Request } from 'express';
import { RequestActivationCodeDto } from '../employees/dto/request-activation-code.dto';
import { ActivateEmployeeDto } from '../employees/dto/activate-employee.dto';
export declare class CompanyAuthController {
    private readonly companyAuthService;
    constructor(companyAuthService: CompanyAuthService);
    register(createCompanyDto: CreateCompanyDto): Promise<string | import("./types/tokens.type").Tokens>;
    requestActivationCode(requestActivationCodeDto: RequestActivationCodeDto): Promise<string | import("./types/tokens.type").Tokens>;
    activateAccount(activateEmployeeDto: ActivateEmployeeDto): Promise<import("./types/tokens.type").Tokens>;
    login(loginCompanyDto: LoginCompanyDto): Promise<import("./types/tokens.type").Tokens>;
    logout(req: Request): Promise<{
        message: string;
    }>;
    refreshTokens(req: Request): Promise<import("./types/tokens.type").Tokens>;
}
