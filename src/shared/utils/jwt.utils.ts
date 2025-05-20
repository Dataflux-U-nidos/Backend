// src/utils/jwt.util.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../infrastructure/config';

export interface JwtPayloadExt extends JwtPayload {
  id: string;
  type: string;
  impersonatorId?: string;
}

/**
 * Desencripta el token JWT y retorna su payload.
 * Lanza un error si el token es inválido o está expirado.
 *
 * @param token - El token JWT a desencriptar.
 * @returns El payload del token.
 */

export const decodeJWT = (token: string): JwtPayloadExt => {
  try {
    return jwt.verify(token, config.jwt.secret) as JwtPayloadExt;
  } catch {
    throw new Error('Token inválido o expirado');
  }
};

export class JwtUtils {
  public static sign(payload: JwtPayloadExt): string {
    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.tokenExpiresIn,
    });
    return accessToken;
  }

  public static signRefresh(payload: JwtPayloadExt): string {
    const refreshToken = jwt.sign(payload, config.jwt.secretRefresh, {
      expiresIn: config.jwt.refreshExpiresTokenIn,
    });
    return refreshToken;
  }
}
