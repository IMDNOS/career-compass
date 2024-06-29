import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class ChargeWalletDto {

  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsNumber()
  money: number;
}

export class ActivateJobDto{
  @IsNotEmpty()
  @IsNumber()
  job_id:number
}

export class SetPremiumCompany {
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  @Min(0)
  premiumLevel: number;
}