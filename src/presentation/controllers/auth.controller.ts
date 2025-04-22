import { Request, Response } from 'express';
import {
  LoginUseCase,
  RefreshTokenUseCase,
  GetSessionUseCase,
} from '../../application/use-cases';
import { LoginDto } from '../../application/dtos/auth.dto';
import { AuthService } from '../../application/services/auth.service';
import { UserRepository } from '../../infrastructure';

export class AuthController {
  private readonly loginUseCase: LoginUseCase;
  private readonly refreshTokenUseCase: RefreshTokenUseCase;
  private readonly getSessionUseCase: GetSessionUseCase;

  constructor() {
    const authService = new AuthService(new UserRepository());
    this.loginUseCase = new LoginUseCase(authService);
    this.refreshTokenUseCase = new RefreshTokenUseCase(authService);
    this.getSessionUseCase = new GetSessionUseCase(authService);
  }

  public async login(req: Request, res: Response): Promise<void> {
    const loginDto: LoginDto = req.body;
    try {
      const tokens = await this.loginUseCase.execute(loginDto);
      // Devolvemos ambos tokens en el body
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userType: tokens.userType,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        res
          .status(401)
          .json({ message: 'No se proporcionó un token Bearer válido' });
        return;
      }
      const refreshToken = authHeader.slice(7).trim();
      const tokens = await this.refreshTokenUseCase.execute({ refreshToken });
      // Devolvemos los nuevos tokens
      res.status(200).json({
        message: 'Tokens renovados correctamente',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userType: tokens.userType,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  }

  public async getSession(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        res
          .status(401)
          .json({ message: 'No se encontró token de acceso en Authorization' });
        return;
      }
      const accessToken = authHeader.slice(7).trim();
      const session = await this.getSessionUseCase.execute(accessToken);
      res.status(200).json({ userType: session.userType });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
        console.log('Error en getSession:', error.message);
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    // Como no hay cookies, el cliente debe borrar sus tokens localmente
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  }
}
