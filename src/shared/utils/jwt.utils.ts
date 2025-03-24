// src/utils/jwt.util.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../infrastructure/config';

/**
 * Desencripta el token JWT y retorna su payload.
 * Lanza un error si el token es inválido o está expirado.
 *
 * @param token - El token JWT a desencriptar.
 * @returns El payload del token.
 */

export const decodeJWT = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    return decoded;
  } catch {
    throw new Error('Token inválido o expirado');
  }
};
