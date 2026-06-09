import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { InvoiceClientDto, LineItemDto } from './create-invoice.dto';

// Explicit optional fields (avoids the @nestjs/mapped-types dependency).
export class UpdateInvoiceDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => InvoiceClientDto)
  client?: InvoiceClientDto;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  projectName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  @IsOptional()
  @IsISO8601()
  issueDate?: string;

  @IsOptional()
  @IsISO8601()
  dueDate?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one line item is required' })
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  items?: LineItemDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  taxRate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;
}
