"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtGuard = exports.AtGuard = void 0;
const passport_1 = require("@nestjs/passport");
class AtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
}
exports.AtGuard = AtGuard;
class RtGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
    constructor() {
        super();
    }
}
exports.RtGuard = RtGuard;
//# sourceMappingURL=decorate-guards.js.map