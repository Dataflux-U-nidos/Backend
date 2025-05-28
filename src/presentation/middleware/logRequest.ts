import { Request, Response, NextFunction } from 'express';
import logger from '../../shared/utils/logger';

export function logRequest(
  routePath: string,
  method: string,
  handlerName?: string,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    logger.info({
      route: routePath,
      method,
      msg: handlerName ? `${handlerName} attempt` : 'Request started',
    });

    // Hook para ejecutar al terminar la respuesta
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logData = {
        route: routePath,
        method,
        status: res.statusCode,
        durationMs: duration,
        msg: handlerName
          ? `${handlerName} ${res.statusCode < 400 ? 'success' : 'failed'}`
          : 'Request finished',
      };

      if (res.statusCode >= 500) {
        logger.error(logData);
      } else if (res.statusCode >= 400) {
        logger.warn(logData);
      } else {
        logger.info(logData);
      }
    });

    next();
  };
}
