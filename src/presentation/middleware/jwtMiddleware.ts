import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../infrastructure/config';

export const validateRoleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      res.status(403).json({ message: 'Token no proporcionado' });
      return;
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      const userRole = decoded.type;

      if (!roles.includes(userRole)) {
        res.status(403).json({ message: 'Acceso denegado' });
        return;
      }

      next();
    } catch {
      res.status(401).json({ message: 'Token inválido o expirado' });
      return;
    }
  };
};
