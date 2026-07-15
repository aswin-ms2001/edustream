import { User } from '@/domain/user/entities/User';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IOTPRepository } from '@/domain/user/repositories/IOTPRepository';
import type { IPasswordHasher } from '@/application/port/services/IPasswordHasher';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import type { ILogger } from '@/application/port/services/ILogger';

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: IOTPRepository,
    private passwordHasher: IPasswordHasher,
    private uuidGenerator: IUuidGenerator,
    private logger: ILogger
  ) {}

  async execute(userData: User): Promise<string> {

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      if (existingUser.isVerified) {
        throw new Error('User already exists and is verified');
      }
      // If user exists but is not verified, we can allow re-registration or resend OTP.
    }

    if (!userData.password) {
      throw new Error('Password is required for local registration');
    }

    const hashedPassword = await this.passwordHasher.hash(userData.password);

    if (!existingUser) {
      const uuid = this.uuidGenerator.generate();
      const userToSave = new User(
        uuid,
        userData.name,
        userData.email,
        userData.role,
        false,
        undefined,
        undefined,
        undefined,
        hashedPassword
      );
      await this.userRepository.save(userToSave);
    } else {
      const userToSave = new User(
        existingUser.id,
        userData.name,
        userData.email,
        userData.role,
        false,
        existingUser.createdAt,
        new Date(),
        existingUser.googleId,
        hashedPassword
      );
      await this.userRepository.update(existingUser.id, userToSave);
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP to cache with 5 minutes TTL
    await this.otpRepository.saveOTP(userData.email, otp, 300);

    // TODO: Send OTP via Email (Mocked for now)
    this.logger.info(`[MOCK EMAIL SENDER] OTP for ${userData.email} is: ${otp}`);

    return 'OTP sent successfully to email';
  }
}
