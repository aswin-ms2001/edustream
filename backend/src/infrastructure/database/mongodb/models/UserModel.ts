import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '@/domain/user/entities/Role';

export interface IUserDocument extends Document {
  userId: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  isVerified: boolean;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function(this: any) { return !this.googleId; } }, // Required if no googleId
    role: { type: String, enum: Object.values(Role), required: true },
    isVerified: { type: Boolean, default: false },
    googleId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
