import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperAdminDto } from './create-super-admin.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSuperAdminDto extends PartialType(CreateSuperAdminDto) {}

export class ActivateJobDto{
  @IsNotEmpty()
  @IsNumber()
  job_id:number
}