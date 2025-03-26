import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { decodeJWT } from '../../shared';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const validateRoleMiddleware = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (!token) {
      res.status(403).json({ message: 'Token no proporcionado' });
      return;
    }

    try {
      const decoded = decodeJWT(token);
      req.user = decoded;

      const userRole = decoded.type as string;
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
