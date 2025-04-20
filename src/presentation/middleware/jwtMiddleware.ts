// src/presentation/middleware/validateRole.ts
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { decodeJWT } from '../../shared';

interface CustomRequest extends Request {
  user?: {
    id: string;
    userType: string;
  };
}

export const validateRoleMiddleware = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'Token no proporcionado' });
      return;
    }

    try {
      // Aquí asumo que tu JWT payload tiene `id` y `type` (no `userType`)
      const decoded = decodeJWT(token) as JwtPayload & {
        id: string;
        type: string;
      };
      // Inyectamos sólo los datos que necesitamos
      req.user = { id: decoded.id, userType: decoded.type };
      console.log('Decoded JWT:', decoded);

      // Comprobamos el rol contra el array de roles permitidos
      if (!roles.includes(decoded.type)) {
        console.log('User role no permitido:', decoded.type);
        res.status(403).json({ message: 'Acceso denegado' });
        return;
      }

      next();
    } catch {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  };
};
