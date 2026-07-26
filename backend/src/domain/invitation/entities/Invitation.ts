import { Role } from '@/domain/user/entities/Role';
import { InvitationStatus } from '../enums/InvitationStatus';
import { BusinessRuleViolationError } from '@/domain/shared/errors';

export class Invitation {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly role: Role,
    public readonly tokenHash: string,
    public status: InvitationStatus,
    public readonly expiresAt: Date,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public acceptedAt?: Date,
    public revokedAt?: Date
  ) {}

  public isExpired(): boolean {
    return new Date() >= this.expiresAt;
  }

  public ensureCanBeAccepted(): void {
    if (this.status === InvitationStatus.ACCEPTED) {
      throw new BusinessRuleViolationError('Invitation has already been accepted.', 'INVITATION_ALREADY_ACCEPTED');
    }
    if (this.status === InvitationStatus.REVOKED) {
      throw new BusinessRuleViolationError('Invitation has been revoked.', 'INVITATION_REVOKED');
    }
    if (this.isExpired()) {
      throw new BusinessRuleViolationError('Invitation has expired.', 'INVITATION_EXPIRED');
    }
    if (this.status !== InvitationStatus.PENDING) {
      throw new BusinessRuleViolationError('Invitation is not pending.', 'INVITATION_NOT_PENDING');
    }
  }

  public accept(): void {
    this.ensureCanBeAccepted();
    this.status = InvitationStatus.ACCEPTED;
    this.acceptedAt = new Date();
    this.updatedAt = new Date();
  }

  public revoke(): void {
    if (this.status === InvitationStatus.ACCEPTED) {
      throw new BusinessRuleViolationError('Cannot revoke an accepted invitation.', 'CANNOT_REVOKE_ACCEPTED_INVITATION');
    }
    this.status = InvitationStatus.REVOKED;
    this.revokedAt = new Date();
    this.updatedAt = new Date();
  }

  static create(
    id: string,
    userId: string,
    email: string,
    role: Role,
    tokenHash: string,
    expiresAt: Date
  ): Invitation {
    const now = new Date();
    return new Invitation(
      id,
      userId,
      email,
      role,
      tokenHash,
      InvitationStatus.PENDING,
      expiresAt,
      now,
      now
    );
  }

  static reconstitute(
    id: string,
    userId: string,
    email: string,
    role: Role,
    tokenHash: string,
    status: InvitationStatus,
    expiresAt: Date,
    createdAt?: Date,
    updatedAt?: Date,
    acceptedAt?: Date,
    revokedAt?: Date
  ): Invitation {
    return new Invitation(id, userId, email, role, tokenHash, status, expiresAt, createdAt, updatedAt, acceptedAt, revokedAt);
  }
}
