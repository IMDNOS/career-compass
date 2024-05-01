import { AuthGuard } from '@nestjs/passport';

export class EmployeeAtGuard extends AuthGuard('employee-jwt'){
  constructor() {
    super();
  }
}
export class EmployeeRtGuard extends AuthGuard('employee-jwt-refresh'){
  constructor() {
    super();
  }
}