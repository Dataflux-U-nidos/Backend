import { Request, Response, NextFunction } from 'express';
import {
  SendRecoveryEmailUseCase,
  SendCuestionaryEmailUseCase,
} from '../../application';

export class EmailController {
  constructor(
    private readonly sendRecoveryEmailUseCase: SendRecoveryEmailUseCase,
    private readonly sendCuestionaryEmailUseCase: SendCuestionaryEmailUseCase,
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

  public sendCuestionary = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body;
      console.log(
        'EmailController - llego al controller de cuestionary:',
        email,
      );
      const result = await this.sendCuestionaryEmailUseCase.execute(email);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error('Error en sendCuestionary:', error);
      next(error);
    }
  };
}
