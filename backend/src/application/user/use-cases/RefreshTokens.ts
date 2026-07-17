import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import type { ISessionRepository } from '@/domain/session/repositories/ISessionRepository';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import { SessionStatus } from '@/domain/session/enums/SessionStatus';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokens {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
    private sessionRepository: ISessionRepository,
    private tokenHashService: ITokenHashService
  ) {}

  async execute(token: string): Promise<RefreshResponse> {
    // 1. Verify the refresh token JWT
    const payload = this.tokenService.verifyRefreshToken(token);

    // 2. Hash refresh token to look up the session
    const refreshTokenHash = this.tokenHashService.hash(token);
    const session = await this.sessionRepository.findByRefreshTokenHash(refreshTokenHash);

    // 3. Validate Session exists and is active/not expired
    if (!session) {
      throw new Error('Session not found');
    }

    if (session.status !== SessionStatus.ACTIVE) {
      throw new Error('Session is not active');
    }

    if (session.expiresAt.getTime() < Date.now()) {
      throw new Error('Session has expired');
    }

    // 4. Validate JWT payload against the session (defense-in-depth)
    if (payload.userId !== session.userId) {
      throw new Error('Invalid session payload mismatch');
    }

    // 5. Load user using session.userId as the source of truth
    const user = await this.userRepository.findById(session.userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isVerified) {
      throw new Error('User is not verified');
    }

    // 6. Generate a new Access Token (without rotating the Refresh Token)
    const newPayload = { userId: user.id, role: user.role };
    const newAccessToken = this.tokenService.generateAccessToken(newPayload);

    return {
      accessToken: newAccessToken,
      refreshToken: token,
    };
  }
}
