import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { LoginDto, JwtAccessTokenDto } from '../dtos/auth.dto';
import config from '../../infrastructure/config';

export class AuthService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  // Login - Solo devuelve access token
  public async login(loginDto: LoginDto): Promise<JwtAccessTokenDto> {
    const { email, password } = loginDto;

    // Verificar el usuario por email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Verificar la contraseña usando Argon2
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Crear el JWT (access token)
    const payload = { id: user.id, type: user.type };
    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);

    // Solo devolvemos el access token, no el refresh token
    return {
      accessToken,
      userType: user.type,
    };
  }

  public async getSession(token: string): Promise<{ userType: string }> {
    try {
      const decoded: any = jwt.verify(token, config.jwt.secret);
      return { userType: decoded.type };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expirado');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Token inválido');
      }
    }
    throw new Error('Unable to process the token');
  }
}
