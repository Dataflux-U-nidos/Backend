import { Request, Response } from 'express';
import {
  LoginUseCase,
  RefreshTokenUseCase,
  GetSessionUseCase,
  ImpersonateUseCase,
} from '../../application/use-cases';
import { LoginDto } from '../../application/dtos/auth.dto';
import { AuthService } from '../../application/services/auth.service';
import { UserRepository } from '../../infrastructure';
import { ImpersonateUserDto } from '../../application/dtos/impersonate.dto';

interface RequestWithUser extends Request {
  user: { id: string };
}

export class AuthController {
  private readonly loginUseCase: LoginUseCase;
  private readonly refreshTokenUseCase: RefreshTokenUseCase;
  private readonly getSessionUseCase: GetSessionUseCase;
  private readonly impersonateUseCase: ImpersonateUseCase;

  constructor() {
    const authService = new AuthService(new UserRepository());
    this.loginUseCase = new LoginUseCase(authService);
    this.refreshTokenUseCase = new RefreshTokenUseCase(authService);
    this.getSessionUseCase = new GetSessionUseCase(authService);
    this.impersonateUseCase = new ImpersonateUseCase(authService);
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
      console.log('Authorization header:', authHeader);
      const accessToken = authHeader.slice(7).trim();
      const session = await this.getSessionUseCase.execute(accessToken);
      res.status(200).json({ userType: session.userType });
    } catch (error: unknown) {
      console.log('Error en getSession:', error);
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
        console.log('Error en getSession:', error.message);
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  }

  public async impersonate(req: RequestWithUser, res: Response): Promise<void> {
    console.log('Impersonate endpoint hit');
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);
    try {
      const impersonaterId = req.user.id;
      const { targetUserId } = req.body as ImpersonateUserDto;

      const tokens = await this.impersonateUseCase.execute(
        impersonaterId,
        targetUserId,
      );

      res.status(200).json({
        message: 'Impersonación exitosa',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userType: tokens.userType,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    // Como no hay cookies, el cliente debe borrar sus tokens localmente
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  }
}
