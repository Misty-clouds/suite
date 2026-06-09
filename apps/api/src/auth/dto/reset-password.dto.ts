import {
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'A valid email is required' })
  email!: string;

  @Length(6, 6, { message: 'The code must be 6 digits' })
  @Matches(/^\d{6}$/, { message: 'The code must be 6 digits' })
  code!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(72, { message: 'Password must be at most 72 characters' })
  newPassword!: string;
}
