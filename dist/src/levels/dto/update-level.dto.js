"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLevelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_level_dto_1 = require("./create-level.dto");
class UpdateLevelDto extends (0, mapped_types_1.PartialType)(create_level_dto_1.CreateLevelDto) {
}
exports.UpdateLevelDto = UpdateLevelDto;
//# sourceMappingURL=update-level.dto.js.map