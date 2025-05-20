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
      logger.info({
        route: routePath,
        method,
        status: res.statusCode,
        durationMs: duration,
        msg: handlerName ? `${handlerName} success` : 'Request finished',
      });
    });

    next();
  };
}
