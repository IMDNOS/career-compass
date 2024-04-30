import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
type JwtPayload = {
    id: string;
    name: string;
    email: string;
};
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
