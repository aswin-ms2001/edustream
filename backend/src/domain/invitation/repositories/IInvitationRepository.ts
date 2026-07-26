import { Invitation } from '../entities/Invitation';
import type { ITransactionContext } from '@/domain/session/repositories/ISessionRepository';

export interface IInvitationRepository {
  save(invitation: Invitation, context?: ITransactionContext): Promise<Invitation>;
  findById(id: string): Promise<Invitation | null>;
  findByTokenHash(tokenHash: string): Promise<Invitation | null>;
  findActiveByUserId(userId: string): Promise<Invitation | null>;
  revokeAllPendingForUser(userId: string, context?: ITransactionContext): Promise<void>;
  update(id: string, invitationData: Partial<Invitation>, context?: ITransactionContext): Promise<Invitation | null>;
}
