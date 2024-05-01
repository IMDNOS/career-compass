import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

type JwtPayload={
  id: string,
  company_name: string,
  email: string,
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'company-jwt'){
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'company_at_secret',
    });
  }
  validate(payload:JwtPayload) {
    return payload;
  }
}