import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { Exclude } from 'class-transformer';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}