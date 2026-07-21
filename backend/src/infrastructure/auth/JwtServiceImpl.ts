import type { ITokenService, ITokenPayload } from '@/domain/user/repositories/ITokenService';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '@/application/errors';

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
      throw new AuthenticationError('Invalid or expired access token');
    }
  }

  verifyRefreshToken(token: string): ITokenPayload {
    try {
      return jwt.verify(token, this.refreshSecret) as ITokenPayload;
    } catch (error) {
      throw new AuthenticationError('Invalid or expired refresh token');
    }
  }

  /**
   * Retrieves the expiration date of a token.
   * NOTE: This method uses jwt.decode() without verifying the signature under the assumption
   * that the token is already trusted (e.g., freshly generated). Do NOT use this method
   * on untrusted tokens from client requests without verifying the signature first.
   */
  getTokenExpiration(token: string): Date {
    try {
      const decoded = jwt.decode(token) as { exp?: number };
      if (!decoded || typeof decoded.exp === 'undefined') {
        throw new Error('Invalid token: missing exp claim');
      }
      return new Date(decoded.exp * 1000);
    } catch (error: any) {
      throw new Error(`Failed to parse token expiration: ${error.message}`);
    }
  }
}
