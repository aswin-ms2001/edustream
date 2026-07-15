import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import type { IPasswordHasher } from '@/application/port/services/IPasswordHasher';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
    private passwordHasher:IPasswordHasher
  ) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isVerified) {
      throw new Error('User email is not verified');
    }

    if (!user.password) {
      throw new Error('User signed up with Google. Please login with Google.');
    }

    const isPasswordValid = await this.passwordHasher.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
