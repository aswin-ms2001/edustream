import winston from 'winston';
import fs from 'fs';
import path from 'path';
import type { ILogger } from '@/application/port/services/ILogger';

export class WinstonLogger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    const logDir = path.resolve(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    };

    const colors = {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'blue',
    };

    winston.addColors(colors);

    // Environment-based log level
    const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

    const format = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.errors({ stack: true }),
      winston.format.json()
    );

    const transports = [
      new winston.transports.Console({
        level: level,
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.printf(
            (info) => `${info.timestamp} [${info.level}]: ${info.message}${info.stack ? `\n${info.stack}` : ''}`
          )
        ),
      }),
      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: format,
      }),
      new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
        level: level,
        format: format,
      }),
    ];

    this.logger = winston.createLogger({
      level,
      levels,
      transports,
    });
  }

  error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  http(message: string, meta?: any): void {
    this.logger.http(message, meta);
  }

  debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }
}
