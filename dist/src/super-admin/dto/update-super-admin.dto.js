"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSuperAdminDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_super_admin_dto_1 = require("./create-super-admin.dto");
class UpdateSuperAdminDto extends (0, mapped_types_1.PartialType)(create_super_admin_dto_1.CreateSuperAdminDto) {
}
exports.UpdateSuperAdminDto = UpdateSuperAdminDto;
//# sourceMappingURL=update-super-admin.dto.js.map