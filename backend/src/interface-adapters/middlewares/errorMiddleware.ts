import type { Request, Response, NextFunction } from 'express';
import type { ILogger } from '@/application/port/services/ILogger';

export function errorMiddleware(logger: ILogger) {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message || 'Unhandled error', {
      error: err,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
    });

    const status = err.status || 500;
    res.status(status).json({
      success: false,
      error: err.message || 'Internal Server Error',
    });
  };
}
