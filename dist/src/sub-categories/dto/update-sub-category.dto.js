"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sub_category_dto_1 = require("./create-sub-category.dto");
class UpdateSubCategoryDto extends (0, mapped_types_1.PartialType)(create_sub_category_dto_1.CreateSubCategoryDto) {
}
exports.UpdateSubCategoryDto = UpdateSubCategoryDto;
//# sourceMappingURL=update-sub-category.dto.js.map