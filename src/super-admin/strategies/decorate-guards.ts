import { AuthGuard } from '@nestjs/passport';

export class AtGuardSuperAdmin extends AuthGuard('super-admin-jwt'){
  constructor() {
    super();
  }
}
