import type { IOTPRepository } from '@/domain/user/repositories/IOTPRepository';
import type { ICacheService } from '@/application/port/services/ICacheService';

export class OTPRepository implements IOTPRepository {
  constructor(private cacheService: ICacheService) {}

  async saveOTP(email: string, otp: string, ttlSeconds: number): Promise<void> {
    const key = `otp:${email}`;
    await this.cacheService.set(key, otp, ttlSeconds);
  }

  async getOTP(email: string): Promise<string | null> {
    const key = `otp:${email}`;
    return await this.cacheService.get(key);
  }

  async deleteOTP(email: string): Promise<void> {
    const key = `otp:${email}`;
    await this.cacheService.del(key);
  }
}
