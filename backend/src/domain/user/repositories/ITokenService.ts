export interface ITokenPayload {
  userId: string;
  role: string;
}

export interface ITokenService {
  generateAccessToken(payload: ITokenPayload): string;
  generateRefreshToken(payload: ITokenPayload): string;
  verifyAccessToken(token: string): ITokenPayload;
  verifyRefreshToken(token: string): ITokenPayload;
  /**
   * Retrieves the expiration date of a token.
   * NOTE: For performance reasons, this method may use decoding instead of verification.
   * It should ONLY be used for trusted tokens (e.g. immediately after generation).
   */
  getTokenExpiration(token: string): Date;
}
