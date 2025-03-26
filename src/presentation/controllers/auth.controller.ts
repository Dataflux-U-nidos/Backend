import { Request, Response } from 'express';
import { LoginUseCase } from '../../application';
import { LoginDto, JwtAccessTokenDto } from '../../application/dtos/auth.dto';
import { AuthService } from '../../application/services/auth.service';
import { UserRepository } from '../../infrastructure';

export class AuthController {
  private readonly loginUseCase: LoginUseCase;

  constructor() {
    this.loginUseCase = new LoginUseCase(new AuthService(new UserRepository()));
  }

  public async login(req: Request, res: Response): Promise<void> {
    const loginDto: LoginDto = req.body;
    try {
      const tokens: JwtAccessTokenDto =
        await this.loginUseCase.execute(loginDto);
      res.json(tokens);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  }
}
