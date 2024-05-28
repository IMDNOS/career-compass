import { IsEmail, IsNotEmpty } from 'class-validator';

export class ActivateSuperAdmin{
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class MakeManagerDto extends ActivateSuperAdmin{}