import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { INVOICE_STATUSES } from '../schemas/invoice.schema';
import type { InvoiceStatus } from '../schemas/invoice.schema';

export class QueryInvoicesDto {
  @IsOptional()
  @IsEnum(INVOICE_STATUSES)
  status?: InvoiceStatus;

  // Search across invoice number, project name, and client name/email.
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number = 20;
}
