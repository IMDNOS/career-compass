import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class RequestPremiumDto {
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  premiumLevel:number
}