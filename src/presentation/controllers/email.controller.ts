import { Request, Response, NextFunction } from 'express';
import { SendRecoveryEmailUseCase } from '../../application';

export class EmailController {
  constructor(
    private readonly sendRecoveryEmailUseCase: SendRecoveryEmailUseCase,
  ) {}

  public recoverPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body;
      console.log('EmailController - ayuda:', email);
      const result = await this.sendRecoveryEmailUseCase.execute(email);

      res.status(200).json({ message: result });
    } catch (error) {
      console.error('Error en EmailController:', error);
      next(error);
    }
  };
}
