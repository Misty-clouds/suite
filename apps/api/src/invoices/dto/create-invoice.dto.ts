import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsISO8601,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class LineItemDto {
  @IsString()
  @MaxLength(200)
  name!: string;

  @IsNumber()
  @Min(0)
  quantity!: number;

  @IsNumber()
  @Min(0)
  unitPrice!: number;
}

export class InvoiceClientDto {
  @IsOptional()
  @IsMongoId()
  clientId?: string;

  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  address?: string;
}

export class CreateInvoiceDto {
  @ValidateNested()
  @Type(() => InvoiceClientDto)
  client!: InvoiceClientDto;

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

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one line item is required' })
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  items!: LineItemDto[];

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
