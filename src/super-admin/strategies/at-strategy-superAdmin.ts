import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload={
  id: string,
  email: string,
}

@Injectable()
export class AtStrategySuperAdmin extends PassportStrategy(Strategy, 'super-admin-jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-admin',
    });
  }


  validate(payload:JwtPayload) {
    return payload;
  }
}
