"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRtGuard = exports.CompanyAtGuard = void 0;
const passport_1 = require("@nestjs/passport");
class CompanyAtGuard extends (0, passport_1.AuthGuard)('company-jwt') {
    constructor() {
        super();
    }
}
exports.CompanyAtGuard = CompanyAtGuard;
class CompanyRtGuard extends (0, passport_1.AuthGuard)('company-jwt-refresh') {
    constructor() {
        super();
    }
}
exports.CompanyRtGuard = CompanyRtGuard;
//# sourceMappingURL=decorate-guards.js.map