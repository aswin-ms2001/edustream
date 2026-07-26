import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import { User } from '@/domain/user/entities/User';
import { Role } from '@/domain/user/entities/Role';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import { UserModel } from '@/infrastructure/database/mongodb/models/UserModel';
import { ConflictError } from '@/application/errors';
import type { ITransactionContext } from '@/domain/session/repositories/ISessionRepository';

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
    return this.mapToDomain(userDoc);
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ userId: id });
    if (!userDoc) return null;
    return this.mapToDomain(userDoc);
  }

  async existsByRole(role: Role): Promise<boolean> {
    const count = await UserModel.countDocuments({ role });
    return count > 0;
  }

  async save(user: User, context?: ITransactionContext): Promise<User> {
    try {
      const { id, ...rest } = user;
      const newUser = new UserModel({
        userId: id,
        ...rest,
      });
      const options = context?.session ? { session: context.session } : undefined;
      const savedUser = await newUser.save(options);
      return this.mapToDomain(savedUser);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictError('User with this email already exists');
      }
      throw error;
    }
  }

  async update(id: string, userData: Partial<User>, context?: ITransactionContext): Promise<User | null> {
    const { id: _, ...rest } = userData as any;
    const options: any = { new: true };
    if (context?.session) {
      options.session = context.session;
    }
    const updatedUser = await UserModel.findOneAndUpdate({ userId: id }, rest, options);
    if (!updatedUser) return null;
    return this.mapToDomain(updatedUser);
  }

  private mapToDomain(userDoc: any): User {
    return User.reconstitute(
      userDoc.userId,
      userDoc.name,
      userDoc.email,
      userDoc.role as Role,
      userDoc.isVerified,
      (userDoc.status as UserStatus) || UserStatus.ACTIVE,
      userDoc.createdAt,
      userDoc.updatedAt,
      userDoc.googleId,
      userDoc.password
    );
  }
}
