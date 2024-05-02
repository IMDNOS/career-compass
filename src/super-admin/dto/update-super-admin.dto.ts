import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperAdminDto } from './create-super-admin.dto';

export class UpdateSuperAdminDto extends PartialType(CreateSuperAdminDto) {}
