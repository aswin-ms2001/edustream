import type { IOTPRepository } from '@/domain/user/repositories/IOTPRepository';

export class InMemoryOTPRepository implements IOTPRepository {
  private otps = new Map<string, { otp: string; expiresAt: number }>();

  async saveOTP(email: string, otp: string, ttlSeconds: number): Promise<void> {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.otps.set(email, { otp, expiresAt });
  }

  async getOTP(email: string): Promise<string | null> {
    const record = this.otps.get(email);
    if (!record) return null;
    if (Date.now() > record.expiresAt) {
      this.otps.delete(email);
      return null;
    }
    return record.otp;
  }

  async deleteOTP(email: string): Promise<void> {
    this.otps.delete(email);
  }
}
