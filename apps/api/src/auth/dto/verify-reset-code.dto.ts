import { IsEmail, Length, Matches } from 'class-validator';

export class VerifyResetCodeDto {
  @IsEmail({}, { message: 'A valid email is required' })
  email!: string;

  @Length(6, 6, { message: 'The code must be 6 digits' })
  @Matches(/^\d{6}$/, { message: 'The code must be 6 digits' })
  code!: string;
}
