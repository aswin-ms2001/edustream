import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '@/domain/user/entities/Role';
import { InvitationStatus } from '@/domain/invitation/enums/InvitationStatus';

export interface IInvitationDocument extends Document {
  invitationId: string;
  userId: string;
  email: string;
  role: Role;
  tokenHash: string;
  status: InvitationStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date;
  revokedAt?: Date;
}

const invitationSchema = new Schema<IInvitationDocument>(
  {
    invitationId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    role: { type: String, enum: Object.values(Role), required: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: Object.values(InvitationStatus), required: true, default: InvitationStatus.PENDING, index: true },
    expiresAt: { type: Date, required: true, index: true },
    acceptedAt: { type: Date },
    revokedAt: { type: Date },
  },
  { timestamps: true }
);

export const InvitationModel = mongoose.model<IInvitationDocument>('Invitation', invitationSchema);
