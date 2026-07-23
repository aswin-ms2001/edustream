import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '@/domain/user/entities/Role';
import { UserStatus } from '@/domain/user/enums/UserStatus';

export interface IUserDocument extends Document {
  userId: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  isVerified: boolean;
  status: UserStatus;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function(this: any) { return !this.googleId; } },
    role: { type: String, enum: Object.values(Role), required: true },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE, required: true },
    googleId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
