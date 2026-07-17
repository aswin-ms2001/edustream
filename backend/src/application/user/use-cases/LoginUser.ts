import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { ITokenService } from '@/domain/user/repositories/ITokenService';
import type { IPasswordHasher } from '@/application/port/services/IPasswordHasher';
import type { ISessionRepository } from '@/domain/session/repositories/ISessionRepository';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
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

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
    private passwordHasher: IPasswordHasher,
    private sessionRepository: ISessionRepository,
    private uuidGenerator: IUuidGenerator,
    private tokenHashService: ITokenHashService,
    private transactionManager: ITransactionManager
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

    // Hash refresh token & get its expiration date before starting database transaction
    const refreshTokenHash = this.tokenHashService.hash(refreshToken);
    const expiresAt = this.tokenService.getTokenExpiration(refreshToken);

    // Execute session lifecycle inside a database transaction to ensure atomicity
    await this.transactionManager.execute(async (context) => {
      // Find any existing active session and revoke it
      const activeSession = await this.sessionRepository.findActiveByUserId(user.id);
      if (activeSession) {
        await this.sessionRepository.revoke(activeSession.id, context);
      }

      // Create a new session
      const newSession = new Session(
        this.uuidGenerator.generate(),
        user.id,
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
