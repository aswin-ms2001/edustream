import type { Request, Response, NextFunction } from 'express';
import type { ILogger } from '@/application/port/services/ILogger';
import { ApplicationError } from '@/application/errors';

export function errorMiddleware(logger: ILogger) {
  return (err: Error, req: Request, res: Response, _next: NextFunction) => {
    const requestContext = {
      url: req.originalUrl,
      method: req.method,
    };

    if (err instanceof ApplicationError) {
      // Expected business errors — log at warn level
      logger.warn(err.message, {
        code: err.code,
        ...requestContext,
      });

      res.status(err.httpStatus).json({
        success: false,
        error: {
          code: err.code,
          message: err.message,
        },
      });
      return;
    }

    // Unexpected errors — log at error level with full stack trace
    logger.error(err.message || 'Unhandled error', {
      error: err,
      stack: err.stack,
      ...requestContext,
    });

    const isProduction = process.env.NODE_ENV === 'production';

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: isProduction ? 'Internal Server Error' : err.message || 'Internal Server Error',
      },
    });
  };
}
