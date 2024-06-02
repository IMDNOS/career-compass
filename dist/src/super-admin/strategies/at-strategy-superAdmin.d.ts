import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
type JwtPayload = {
    id: string;
    email: string;
};
declare const AtStrategySuperAdmin_base: new (...args: any[]) => Strategy;
export declare class AtStrategySuperAdmin extends AtStrategySuperAdmin_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
