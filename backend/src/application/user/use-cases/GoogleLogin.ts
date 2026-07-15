import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IGoogleAuthService } from '@/domain/user/repositories/IGoogleAuthService';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import { Role } from '@/domain/user/entities/Role';
import { User } from '@/domain/user/entities/User';

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
    private tokenService: ITokenService,
    private uuidGenerator: IUuidGenerator
  ) {}

  async execute(idToken: string): Promise<LoginResponse> {
    // 1. Verify the Google Token
    const googleUser = await this.googleAuthService.verifyToken(idToken);

    // 2. Check if user exists
    let user = await this.userRepository.findByEmail(googleUser.email);

    if (!user) {
      // 3. If new user, create as Student by default
      const uuid = this.uuidGenerator.generate();
      const newUser = User.createGoogleUser(uuid, googleUser.name, googleUser.email, googleUser.googleId, Role.STUDENT);
      user = await this.userRepository.save(newUser);
    } else if (!user.googleId) {
      // 4. If user exists from local auth, link Google ID
      await this.userRepository.update(user.id, {
        googleId: googleUser.googleId,
        isVerified: true, // Ensure they are marked verified
      });
      user.googleId = googleUser.googleId;
      user.isVerified = true;
    }

    // 5. Generate tokens
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
