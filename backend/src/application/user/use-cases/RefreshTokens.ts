import { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import { ITokenService } from '@/domain/user/repositories/ITokenService';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokens {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute(token: string): Promise<RefreshResponse> {
    const payload = this.tokenService.verifyRefreshToken(token);

    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isVerified) {
      throw new Error('User is not verified');
    }

    const newPayload = { userId: user.id as string, role: user.role };
    const newAccessToken = this.tokenService.generateAccessToken(newPayload);
    const newRefreshToken = this.tokenService.generateRefreshToken(newPayload);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
