import type { Server } from 'http';
import mongoose from 'mongoose';
import type Redis from 'ioredis';

import type { ILogger } from '@/application/port/services/ILogger';

export function registerGracefulShutdown(
  server: Server,
  logger: ILogger,
  redisClient: Redis,
): void {
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`);

    server.close(async () => {
      logger.info('HTTP server stopped accepting new connections.');

      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed.');
      } catch (error) {
        logger.error('Failed to close MongoDB connection.', {
          error,
        });
      }

      try {
        await redisClient.quit();
        logger.info('Redis connection closed.');
      } catch (error) {
        logger.error('Failed to close Redis connection.', {
          error,
        });
      }

      logger.info('Application shutdown completed.');

      process.exit(0);
    });
  };

  process.on('SIGINT', () => {
    void shutdown('SIGINT');
  });

  process.on('SIGTERM', () => {
    void shutdown('SIGTERM');
  });
}