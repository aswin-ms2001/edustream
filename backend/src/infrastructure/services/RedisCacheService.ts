import type { ICacheService } from '@/application/port/services/ICacheService';
import type Redis from 'ioredis';

export class RedisCacheService implements ICacheService {
  constructor(private redisClient: Redis) {}

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', ttlSeconds);
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
