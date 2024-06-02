"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtGuardSuperAdmin = void 0;
const passport_1 = require("@nestjs/passport");
class AtGuardSuperAdmin extends (0, passport_1.AuthGuard)('super-admin-jwt') {
    constructor() {
        super();
    }
}
exports.AtGuardSuperAdmin = AtGuardSuperAdmin;
//# sourceMappingURL=decorate-guards.js.map