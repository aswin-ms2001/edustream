import type { Session } from '@/domain/session/entities/Session';

export interface ITransactionContext {
  session: any;
}

export interface ISessionRepository {
  create(session: Session, context?: ITransactionContext): Promise<void>;
  findById(id: string): Promise<Session | null>;
  findActiveByUserId(userId: string): Promise<Session | null>;
  findByRefreshTokenHash(refreshTokenHash: string): Promise<Session | null>;
  revoke(sessionId: string, context?: ITransactionContext): Promise<void>;
}
