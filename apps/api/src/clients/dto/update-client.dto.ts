import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

// All fields optional — explicit (rather than PartialType) to avoid adding
// the @nestjs/mapped-types dependency.
export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'A valid email is required' })
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  address?: string;
}
