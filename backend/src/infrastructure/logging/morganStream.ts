import type { ILogger } from '@/application/port/services/ILogger';

export function createMorganStream(logger: ILogger) {
  return {
    write: (message: string) => {
      logger.http(message.trim());
    },
  };
}