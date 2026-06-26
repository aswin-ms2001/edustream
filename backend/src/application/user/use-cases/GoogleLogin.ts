import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IGoogleAuthService } from '@/domain/user/repositories/IGoogleAuthService';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import { Role } from '@/domain/user/entities/Role';

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

export class GoogleLogin {
  constructor(
    private userRepository: IUserRepository,
    private googleAuthService: IGoogleAuthService,
    private tokenService: ITokenService
  ) {}

  async execute(idToken: string): Promise<LoginResponse> {
    // 1. Verify the Google Token
    const googleUser = await this.googleAuthService.verifyToken(idToken);

    // 2. Check if user exists
    let user = await this.userRepository.findByEmail(googleUser.email);

    if (!user) {
      // 3. If new user, create as Student by default
      user = await this.userRepository.save({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        role: Role.STUDENT,
        isVerified: true, // Google emails are already verified
      });
    } else if (!user.googleId) {
      // 4. If user exists from local auth, link Google ID
      await this.userRepository.update(user.id as string, {
        googleId: googleUser.googleId,
        isVerified: true, // Ensure they are marked verified
      });
      user.googleId = googleUser.googleId;
      user.isVerified = true;
    }

    // 5. Generate tokens
    const payload = { userId: user.id as string, role: user.role };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id as string,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
