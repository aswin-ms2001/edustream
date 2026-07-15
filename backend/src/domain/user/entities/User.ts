import { Role } from '@/domain/user/entities/Role';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: Role,
    public isVerified: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public googleId?: string,
    public password?: string ,
  ) {}
    static createGoogleUser(
      id: string,
      name: string,
      email: string,
      googleId: string,
      role: Role
    ): User {

        return new User(
            id,
            name,
            email,
            role,
            true,
            new Date(),
            new Date(),
            googleId,
            undefined
        );

    }
}