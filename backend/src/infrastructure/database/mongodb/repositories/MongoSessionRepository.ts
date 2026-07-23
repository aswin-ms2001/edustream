import type { ISessionRepository, ITransactionContext } from '@/domain/session/repositories/ISessionRepository';
import { Session } from '@/domain/session/entities/Session';
import { SessionStatus } from '@/domain/session/enums/SessionStatus';
import { SessionModel, type ISessionDocument } from '@/infrastructure/database/mongodb/models/SessionModel';

export class MongoSessionRepository implements ISessionRepository {
  async create(session: Session, context?: ITransactionContext): Promise<void> {
    const sessionDoc = new SessionModel({
      sessionId: session.id,
      userId: session.userId,
      refreshTokenHash: session.refreshTokenHash,
      status: session.status,
      expiresAt: session.expiresAt,
      revokedAt: session.revokedAt,
    });
    await sessionDoc.save({ session: context?.session });
  }

  async findById(id: string): Promise<Session | null> {
    const sessionDoc = await SessionModel.findOne({ sessionId: id });
    if (!sessionDoc) return null;
    return this.mapToDomain(sessionDoc);
  }

  async findActiveByUserId(userId: string): Promise<Session | null> {
    const sessionDoc = await SessionModel.findOne({ userId, status: SessionStatus.ACTIVE });
    if (!sessionDoc) return null;
    return this.mapToDomain(sessionDoc);
  }

  async findByRefreshTokenHash(refreshTokenHash: string): Promise<Session | null> {
    const sessionDoc = await SessionModel.findOne({ refreshTokenHash });
    if (!sessionDoc) return null;
    return this.mapToDomain(sessionDoc);
  }

  async revoke(sessionId: string, context?: ITransactionContext): Promise<void> {
    await SessionModel.findOneAndUpdate(
      { sessionId },
      { status: SessionStatus.REVOKED, revokedAt: new Date() },
      { session: context?.session }
    );
  }

  async revokeAllByUserId(userId: string, context?: ITransactionContext): Promise<void> {
    await SessionModel.updateMany(
      { userId, status: SessionStatus.ACTIVE },
      { status: SessionStatus.REVOKED, revokedAt: new Date() },
      { session: context?.session }
    );
  }

  private mapToDomain(sessionDoc: ISessionDocument): Session {
    return new Session(
      sessionDoc.sessionId,
      sessionDoc.userId,
      sessionDoc.refreshTokenHash,
      sessionDoc.status as SessionStatus,
      sessionDoc.createdAt,
      sessionDoc.expiresAt,
      sessionDoc.revokedAt,
      sessionDoc.updatedAt
    );
  }
}
