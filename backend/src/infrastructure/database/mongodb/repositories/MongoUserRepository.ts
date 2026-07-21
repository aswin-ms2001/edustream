import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import { User } from '@/domain/user/entities/User';
import { UserModel } from '@/infrastructure/database/mongodb/models/UserModel';
import { ConflictError } from '@/application/errors';

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

  async save(user: User): Promise<User> {
    try {
      const { id, ...rest } = user;
      const newUser = new UserModel({
        userId: id,
        ...rest,
      });
      const savedUser = await newUser.save();
      return this.mapToDomain(savedUser);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictError('User with this email already exists');
      }
      throw error;
    }
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const { id: _, ...rest } = userData as any;
    const updatedUser = await UserModel.findOneAndUpdate({ userId: id }, rest, { new: true });
    if (!updatedUser) return null;
    return this.mapToDomain(updatedUser);
  }

  private mapToDomain(userDoc: any): User {
    return new User(
      userDoc.userId,
      userDoc.name,
      userDoc.email,
      userDoc.role,
      userDoc.isVerified,
      userDoc.createdAt,
      userDoc.updatedAt,
      userDoc.googleId,
      userDoc.password
    );
  }
}
