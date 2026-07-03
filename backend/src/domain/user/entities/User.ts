import { Role } from '@/domain/user/entities/Role';

export class User {
  constructor(
    public id: string | null,
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
      name: string,
      email: string,
      googleId: string,
      role: Role
    ): User {

        return new User(
            null,          // id not known yet
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