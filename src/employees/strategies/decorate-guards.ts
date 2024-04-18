import { AuthGuard } from '@nestjs/passport';

export class AtGuard extends AuthGuard('jwt'){
  constructor() {
    super();
  }
}
export class RtGuard extends AuthGuard('jwt-refresh'){
  constructor() {
    super();
  }
}