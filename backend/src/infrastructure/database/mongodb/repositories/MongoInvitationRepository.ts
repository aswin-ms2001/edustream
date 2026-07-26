import type { IInvitationRepository } from '@/domain/invitation/repositories/IInvitationRepository';
import { Invitation } from '@/domain/invitation/entities/Invitation';
import { InvitationStatus } from '@/domain/invitation/enums/InvitationStatus';
import { Role } from '@/domain/user/entities/Role';
import { InvitationModel, type IInvitationDocument } from '../models/InvitationModel';
import type { ITransactionContext } from '@/domain/session/repositories/ISessionRepository';

export class MongoInvitationRepository implements IInvitationRepository {
  async save(invitation: Invitation, context?: ITransactionContext): Promise<Invitation> {
    const options = context?.session ? { session: context.session } : undefined;
    const doc = new InvitationModel({
      invitationId: invitation.id,
      userId: invitation.userId,
      email: invitation.email,
      role: invitation.role,
      tokenHash: invitation.tokenHash,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
      acceptedAt: invitation.acceptedAt,
      revokedAt: invitation.revokedAt,
    });
    const saved = await doc.save(options);
    return this.mapToDomain(saved);
  }

  async findById(id: string): Promise<Invitation | null> {
    const doc = await InvitationModel.findOne({ invitationId: id });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findByTokenHash(tokenHash: string): Promise<Invitation | null> {
    const doc = await InvitationModel.findOne({ tokenHash });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findActiveByUserId(userId: string): Promise<Invitation | null> {
    const doc = await InvitationModel.findOne({
      userId,
      status: InvitationStatus.PENDING,
      expiresAt: { $gt: new Date() },
    });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async revokeAllPendingForUser(userId: string, context?: ITransactionContext): Promise<void> {
    const options = context?.session ? { session: context.session } : undefined;
    await InvitationModel.updateMany(
      { userId, status: InvitationStatus.PENDING },
      { status: InvitationStatus.REVOKED, revokedAt: new Date() },
      options
    );
  }

  async update(id: string, invitationData: Partial<Invitation>, context?: ITransactionContext): Promise<Invitation | null> {
    const { id: _, ...rest } = invitationData as any;
    const options: any = { new: true };
    if (context?.session) {
      options.session = context.session;
    }
    const updated = await InvitationModel.findOneAndUpdate({ invitationId: id }, rest, options);
    if (!updated) return null;
    return this.mapToDomain(updated as unknown as IInvitationDocument);
  }

  private mapToDomain(doc: IInvitationDocument): Invitation {
    return Invitation.reconstitute(
      doc.invitationId,
      doc.userId,
      doc.email,
      doc.role as Role,
      doc.tokenHash,
      doc.status as InvitationStatus,
      doc.expiresAt,
      doc.createdAt,
      doc.updatedAt,
      doc.acceptedAt,
      doc.revokedAt
    );
  }
}
