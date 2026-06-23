import { Role } from '@/domain/user/entities/Role';

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string; // Optional because of Google Auth
  role: Role;
  isVerified: boolean;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
