import { Type } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { PAYMENT_METHODS } from '../schemas/invoice.schema';
import type { PaymentMethod } from '../schemas/invoice.schema';

export class RecordPaymentDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0.01, { message: 'Payment amount must be greater than zero' })
  amount!: number;

  @IsOptional()
  @IsEnum(PAYMENT_METHODS)
  method?: PaymentMethod;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  reference?: string;

  @IsOptional()
  @IsISO8601()
  paidAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
