import type { Session } from '@/domain/session/entities/Session';

export interface ISessionRepository {
  create(session: Session): Promise<void>;
  findById(id: string): Promise<Session | null>;
  findActiveByUserId(userId: string): Promise<Session | null>;
  findByRefreshTokenHash(refreshTokenHash: string): Promise<Session | null>;
  revoke(sessionId: string): Promise<void>;
}
