import { User } from '@/domain/user/entities/User';
import type { AuthUserDto } from '@/application/user/dto/AuthUserDto';

export class UserMapper {
  static toAuthUserDto(user: User): AuthUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
