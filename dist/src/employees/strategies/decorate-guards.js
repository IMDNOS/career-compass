"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRtGuard = exports.EmployeeAtGuard = void 0;
const passport_1 = require("@nestjs/passport");
class EmployeeAtGuard extends (0, passport_1.AuthGuard)('employee-jwt') {
    constructor() {
        super();
    }
}
exports.EmployeeAtGuard = EmployeeAtGuard;
class EmployeeRtGuard extends (0, passport_1.AuthGuard)('employee-jwt-refresh') {
    constructor() {
        super();
    }
}
exports.EmployeeRtGuard = EmployeeRtGuard;
//# sourceMappingURL=decorate-guards.js.map