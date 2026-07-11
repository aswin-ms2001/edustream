import app from './app';
import { Server } from 'node:http';
import { env } from '@/infrastructure/config/env';
import { connectDatabase } from '@/infrastructure/database/mongodb/connection/connectDatabase';
import { redisClient } from '@/infrastructure/database/redis/redisClient';

import { logger } from './factories/loggerFactory';

import { registerRedisEvents } from './bootstrap/registerRedisEvents';
import { registerProcessEvents } from './bootstrap/registerProcessEvents';
import { registerGracefulShutdown } from './bootstrap/registerGracefulShutdown';

async function bootstrap() {
  try {
    registerRedisEvents(redisClient, logger);

    registerProcessEvents(logger);

    await connectDatabase(logger);

    const server:Server = app.listen(env.PORT, () => {
      logger.info('Server started', {
        port: env.PORT,
        environment: env.NODE_ENV,
      });
    });

    registerGracefulShutdown(server, logger, redisClient);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap();