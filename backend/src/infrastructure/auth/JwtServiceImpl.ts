import type { ITokenService, ITokenPayload } from '@/domain/user/repositories/ITokenService';
import jwt from 'jsonwebtoken';

export class JwtServiceImpl implements ITokenService {
  constructor(
    private accessSecret: string,
    private refreshSecret: string,
    private accessExpiresIn: string = '15m',
    private refreshExpiresIn: string = '7d'
  ) {}

  generateAccessToken(payload: ITokenPayload): string {
    return jwt.sign(payload as object, this.accessSecret, { expiresIn: this.accessExpiresIn as any });
  }

  generateRefreshToken(payload: ITokenPayload): string {
    return jwt.sign(payload as object, this.refreshSecret, { expiresIn: this.refreshExpiresIn as any });
  }

  verifyAccessToken(token: string): ITokenPayload {
    try {
      return jwt.verify(token, this.accessSecret) as ITokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  verifyRefreshToken(token: string): ITokenPayload {
    try {
      return jwt.verify(token, this.refreshSecret) as ITokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}
