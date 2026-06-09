import { IsJWT } from 'class-validator';

export class RefreshTokenDto {
  @IsJWT({ message: 'A valid refresh token is required' })
  refreshToken!: string;
}
