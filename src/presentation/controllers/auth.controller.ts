import { Request, Response } from 'express';
import { LoginUseCase, GetSessionUseCase } from '../../application';
import { LoginDto } from '../../application/dtos/auth.dto';
import { AuthService } from '../../application/services/auth.service';
import { UserRepository } from '../../infrastructure';

export class AuthController {
  private authService: AuthService;
  private readonly loginUseCase: LoginUseCase;
  private getSessionUseCase: GetSessionUseCase;

  constructor() {
    this.authService = new AuthService(new UserRepository());
    this.loginUseCase = new LoginUseCase(new AuthService(new UserRepository()));
    this.getSessionUseCase = new GetSessionUseCase(this.authService);
  }

  public async login(req: Request, res: Response): Promise<void> {
    const loginDto: LoginDto = req.body;
    console.log('Login DTO:', loginDto);
    try {
      const tokens = await this.loginUseCase.execute(loginDto);
      //this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
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
      const token = req.cookies.accessToken;
      if (!token) {
        res.status(401).json({ message: 'No se encontró token de acceso' });
        return;
      }
      const session = await this.getSessionUseCase.execute(token);
      res.status(200).json({ userType: session.userType });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  }
}
