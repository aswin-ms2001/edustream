import type { ILogger } from '@/application/port/services/ILogger';
import type { Logger } from 'winston';
import { createWinstonLogger } from "@/infrastructure/logging/winston.config"

export class WinstonLogger implements ILogger {

  constructor(private readonly logger: Logger) {
    
  }

  error(message: string, meta?: unknown): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: unknown): void {
    this.logger.warn(message, meta);
  }

  info(message: string, meta?: unknown): void {
    this.logger.info(message, meta);
  }

  http(message: string, meta?: unknown): void {
    this.logger.http(message, meta);
  }

  debug(message: string, meta?: unknown): void {
    this.logger.debug(message, meta);
  }
}