import type { IUserRepository } from '@/domain/user/repositories/IUserRepository';
import type { IOTPRepository } from '@/domain/user/repositories/IOTPRepository';

export class VerifyOTP {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: IOTPRepository
  ) {}

  async execute(email: string, otp: string): Promise<boolean> {
    const cachedOTP = await this.otpRepository.getOTP(email);

    if (!cachedOTP) {
      throw new Error('OTP has expired or does not exist');
    }

    if (cachedOTP !== otp) {
      throw new Error('Invalid OTP');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.update(user.id, { isVerified: true });
    await this.otpRepository.deleteOTP(email);

    return true;
  }
}
