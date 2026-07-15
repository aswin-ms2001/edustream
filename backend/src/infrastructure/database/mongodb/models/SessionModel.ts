import mongoose, { Schema, Document } from 'mongoose';
import { SessionStatus } from '@/domain/session/enums/SessionStatus';

export interface ISessionDocument extends Document {
  sessionId: string;
  userId: string;
  refreshTokenHash: string;
  status: SessionStatus;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    refreshTokenHash: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: Object.values(SessionStatus), required: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date },
  },
  { timestamps: true }
);

export const SessionModel = mongoose.model<ISessionDocument>('Session', SessionSchema);
