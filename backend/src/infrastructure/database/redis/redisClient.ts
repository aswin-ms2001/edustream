import Redis from 'ioredis';
import { env } from '@/infrastructure/config/env';

export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 1,
  showFriendlyErrorStack: true
});
