"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStaticDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_static_dto_1 = require("./create-static.dto");
class UpdateStaticDto extends (0, mapped_types_1.PartialType)(create_static_dto_1.CreateStaticDto) {
}
exports.UpdateStaticDto = UpdateStaticDto;
//# sourceMappingURL=update-static.dto.js.map