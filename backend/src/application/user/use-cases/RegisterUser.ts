import { User } from '@/domain/user/entities/User';
import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IOTPRepository } from '@/domain/user/repositories/IOTPRepository';
import type { IPasswordHasher } from '@/application/port/services/IPasswordHasher';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';
import type { ILogger } from '@/application/port/services/ILogger';
import { ConflictError, ValidationError } from '@/application/errors';

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: IOTPRepository,
    private passwordHasher: IPasswordHasher,
    private uuidGenerator: IUuidGenerator,
    private logger: ILogger
  ) {}

  async execute(userData: { name: string; email: string; password?: string }): Promise<string> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      if (existingUser.isVerified) {
        throw new ConflictError('User already exists and is verified');
      }
      // If user exists but is not verified, we allow re-registration by updating password & resending OTP.
    }

    if (!userData.password) {
      throw new ValidationError('Password is required for local registration');
    }

    const hashedPassword = await this.passwordHasher.hash(userData.password);

    if (!existingUser) {
      const uuid = this.uuidGenerator.generate();
      const userToSave = User.registerStudent(uuid, userData.name, userData.email, hashedPassword);
      await this.userRepository.save(userToSave);
    } else {
      const userToSave = User.registerStudent(existingUser.id, userData.name, userData.email, hashedPassword);
      await this.userRepository.update(existingUser.id, userToSave);
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP to cache with 5 minutes TTL
    await this.otpRepository.saveOTP(userData.email, otp, 300);

    this.logger.info(`[MOCK EMAIL SENDER] OTP for ${userData.email} is: ${otp}`);

    return 'OTP sent successfully to email';
  }
}
