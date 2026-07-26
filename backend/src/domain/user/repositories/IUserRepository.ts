import type { User } from '@/domain/user/entities/User';
import type { Role } from '@/domain/user/entities/Role';
import type { UserStatus } from '@/domain/user/enums/UserStatus';
import type { ITransactionContext } from '@/domain/session/repositories/ISessionRepository';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  existsByRole(role: Role): Promise<boolean>;
  save(user: User, context?: ITransactionContext): Promise<User>;
  update(id: string, userData: Partial<User>, context?: ITransactionContext): Promise<User | null>;
  findAllByRole(
    role: Role,
    options: { page: number; limit: number; search?: string; status?: UserStatus }
  ): Promise<{ users: User[]; total: number }>;
}
