import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { User } from '@/domain/user/entities/User';
import { UserModel } from '@/infrastructure/database/mongodb/models/UserModel';

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
    return this.mapToDomain(userDoc);
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;
    return this.mapToDomain(userDoc);
  }

  async save(user: User): Promise<User> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return this.mapToDomain(savedUser);
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, userData, { new: true });
    if (!updatedUser) return null;
    return this.mapToDomain(updatedUser);
  }

  private mapToDomain(userDoc: any): User {
    return {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password,
      role: userDoc.role,
      isVerified: userDoc.isVerified,
      googleId: userDoc.googleId,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    };
  }
}
