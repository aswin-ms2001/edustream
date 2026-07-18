import type { AuthUserDto } from './AuthUserDto';

export interface AuthenticationResultDto {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}
