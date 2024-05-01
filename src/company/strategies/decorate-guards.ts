import { AuthGuard } from '@nestjs/passport';

export class CompanyAtGuard extends AuthGuard('company-jwt') {
  constructor() {
    super();
  }
}

export class CompanyRtGuard extends AuthGuard('company-jwt-refresh') {
  constructor() {
    super();
  }
}