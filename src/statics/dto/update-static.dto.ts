import { PartialType } from '@nestjs/mapped-types';
import { CreateStaticDto } from './create-static.dto';

export class UpdateStaticDto extends PartialType(CreateStaticDto) {}
