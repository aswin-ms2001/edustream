import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IGoogleAuthService } from '@/domain/user/repositories/IGoogleAuthService';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import type { ISessionRepository } from '@/domain/session/repositories/ISessionRepository';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import { Role } from '@/domain/user/entities/Role';
import { User } from '@/domain/user/entities/User';
import { Session } from '@/domain/session/entities/Session';
import { SessionStatus } from '@/domain/session/enums/SessionStatus';

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
    private uuidGenerator: IUuidGenerator,
    private sessionRepository: ISessionRepository,
    private tokenHashService: ITokenHashService,
    private transactionManager: ITransactionManager
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

    // Hash refresh token & get its expiration date before starting database transaction
    const refreshTokenHash = this.tokenHashService.hash(refreshToken);
    const expiresAt = this.tokenService.getTokenExpiration(refreshToken);

    // Execute session lifecycle inside a database transaction to ensure atomicity
    await this.transactionManager.execute(async (context) => {
      // Find any existing active session and revoke it
      const activeSession = await this.sessionRepository.findActiveByUserId(user!.id);
      if (activeSession) {
        await this.sessionRepository.revoke(activeSession.id, context);
      }

      // Create a new session
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
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
