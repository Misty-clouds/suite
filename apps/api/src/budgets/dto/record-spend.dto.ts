import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class RecordSpendDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0.01, { message: 'Spend amount must be greater than zero' })
  amount!: number;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  label?: string;

  @IsOptional()
  @IsISO8601()
  spentAt?: string;
}
