import type { ISessionRepository } from '@/domain/session/repositories/ISessionRepository';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import { SessionStatus } from '@/domain/session/enums/SessionStatus';

export class LogoutUser {
  constructor(
    private sessionRepository: ISessionRepository,
    private tokenService: ITokenService,
    private tokenHashService: ITokenHashService
  ) {}

  async execute(token?: string): Promise<void> {
    if (!token) {
      return; // Idempotent: missing token is a success
    }

    try {
      // 1. Verify token (in-memory validation)
      this.tokenService.verifyRefreshToken(token);
    } catch (error) {
      // Idempotent: ignore expired/invalid token errors
      return;
    }

    // 2. Hash refresh token to find session
    const refreshTokenHash = this.tokenHashService.hash(token);
    const session = await this.sessionRepository.findByRefreshTokenHash(refreshTokenHash);

    // 3. Revoke if exists and active
    if (!session) {
      return; // Idempotent: missing session is a success
    }

    if (session.status === SessionStatus.ACTIVE) {
      await this.sessionRepository.revoke(session.id);
    }
  }
}
