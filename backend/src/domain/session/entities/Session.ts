import { SessionStatus } from '@/domain/session/enums/SessionStatus';

export class Session {
  constructor(
    public id: string,
    public userId: string,
    public refreshTokenHash: string,
    public status: SessionStatus,
    public createdAt: Date,
    public expiresAt: Date,
    public revokedAt?: Date,
    public updatedAt?: Date
  ) {}
}
