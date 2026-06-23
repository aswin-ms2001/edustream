import type { IOTPRepository } from '@/domain/user/repositories/IOTPRepository';
import Redis from 'ioredis';

export class RedisOTPRepository implements IOTPRepository {
  private redis: Redis;

  constructor(redisClient: Redis) {
    this.redis = redisClient;
  }

  async saveOTP(email: string, otp: string, ttlSeconds: number): Promise<void> {
    const key = `otp:${email}`;
    await this.redis.set(key, otp, 'EX', ttlSeconds);
  }

  async getOTP(email: string): Promise<string | null> {
    const key = `otp:${email}`;
    return await this.redis.get(key);
  }

  async deleteOTP(email: string): Promise<void> {
    const key = `otp:${email}`;
    await this.redis.del(key);
  }
}
