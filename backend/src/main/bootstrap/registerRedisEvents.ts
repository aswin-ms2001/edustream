import type { ILogger } from '@/application/port/services/ILogger';
import type Redis from 'ioredis';

export function registerRedisEvents(
  redisClient: Redis,
  logger: ILogger,
): void {
  redisClient.on('connect', () => {
    logger.info('Redis connected');
  });

  redisClient.on('ready', () => {
    logger.info('Redis is ready');
  });

  redisClient.on('error', (err) => {
    logger.error('Redis connection error', {
      error: err.message,
      stack: err.stack,
    });
  });

  redisClient.on('close', () => {
    logger.warn('Redis connection closed');
  });

  redisClient.on('reconnecting', () => {
    logger.warn('Redis reconnecting...');
  });
}