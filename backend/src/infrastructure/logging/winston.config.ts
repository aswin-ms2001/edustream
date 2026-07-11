import fs from 'fs';
import path from 'path';
import winston from 'winston';

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const LOG_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(LOG_COLORS);

export function createWinstonLogger(): winston.Logger {
  const logDir = path.resolve(process.cwd(), 'logs');

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const level =
    process.env.NODE_ENV === 'production'
      ? 'info'
      : 'debug';

  const fileFormat = winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  );

  const consoleFormat = winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} ${level}: ${message}${stack ? `\n${stack}` : ''}`;
    })
  );

  return winston.createLogger({
    level,
    levels: LOG_LEVELS,

    transports: [
      new winston.transports.Console({
        format: consoleFormat,
      }),

      new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
        format: fileFormat,
      }),

      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: fileFormat,
      }),
    ],
  });
}