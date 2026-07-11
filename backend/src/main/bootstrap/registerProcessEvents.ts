import type { ILogger } from '@/application/port/services/ILogger';

export function registerProcessEvents(logger: ILogger): void {
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', {
      message: error.message,
      stack: error.stack,
    });

    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Promise Rejection', {
      reason,
    });
  });
}