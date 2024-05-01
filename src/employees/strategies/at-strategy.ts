import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload={
  id: string,
  name: string,
  email: string,
  gender: string,
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'employee-jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'employee_at_secret',
    });
  }


  validate(payload:JwtPayload) {
    return payload;
  }
}


