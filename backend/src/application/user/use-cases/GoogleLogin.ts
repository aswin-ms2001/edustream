import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IGoogleAuthService } from '@/domain/user/repositories/IGoogleAuthService';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import type { ISessionRepository } from '@/domain/session/repositories/ISessionRepository';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import { User } from '@/domain/user/entities/User';
import { Session } from '@/domain/session/entities/Session';
import { SessionStatus } from '@/domain/session/enums/SessionStatus';
import { UserMapper } from '@/application/user/mapper/UserMapper';
import type { AuthenticationResultDto } from '@/application/user/dto/AuthenticationResultDto';

export class GoogleLogin {
  constructor(
    private userRepository: IUserRepository,
    private googleAuthService: IGoogleAuthService,
    private tokenService: ITokenService,
    private uuidGenerator: IUuidGenerator,
    private sessionRepository: ISessionRepository,
    private tokenHashService: ITokenHashService,
    private transactionManager: ITransactionManager
  ) {}

  async execute(idToken: string): Promise<AuthenticationResultDto> {
    // 1. Verify the Google Token
    const googleUser = await this.googleAuthService.verifyToken(idToken);

    // 2. Check if user exists
    let user = await this.userRepository.findByEmail(googleUser.email);

    if (!user) {
      // 3. If new user, create as Student using the domain factory method
      const uuid = this.uuidGenerator.generate();
      const newUser = User.registerGoogleStudent(uuid, googleUser.name, googleUser.email, googleUser.googleId);
      user = await this.userRepository.save(newUser);
    } else {
      // 4. Existing user: Enforce Google login domain rules (Google login restricted to STUDENT, user must be ACTIVE)
      user.ensureGoogleLoginAllowed();
      user.ensureCanLogin();

      if (!user.googleId) {
        await this.userRepository.update(user.id, {
          googleId: googleUser.googleId,
          isVerified: true,
        });
        user.googleId = googleUser.googleId;
        user.isVerified = true;
      }
    }

    // 5. Generate tokens
    const payload = { userId: user.id, role: user.role };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    const refreshTokenHash = this.tokenHashService.hash(refreshToken);
    const expiresAt = this.tokenService.getTokenExpiration(refreshToken);

    await this.transactionManager.execute(async (context) => {
      const activeSession = await this.sessionRepository.findActiveByUserId(user!.id);
      if (activeSession) {
        await this.sessionRepository.revoke(activeSession.id, context);
      }

      const newSession = new Session(
        this.uuidGenerator.generate(),
        user!.id,
        refreshTokenHash,
        SessionStatus.ACTIVE,
        new Date(),
        expiresAt
      );
      await this.sessionRepository.create(newSession, context);
    });

    return {
      accessToken,
      refreshToken,
      user: UserMapper.toAuthUserDto(user),
    };
  }
}
