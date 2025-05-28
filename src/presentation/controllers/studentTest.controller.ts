import { Request, Response, NextFunction } from 'express';
import {
  PsychometricUseCase,
  VocationalUseCase,
  VocationalPartialUseCase,
  CuestionaryUseCase,
} from '../../application';

export class StudentTestController {
  constructor(
    private readonly psychometricUseCase: PsychometricUseCase,
    private readonly vocationalUseCase: VocationalUseCase,
    private readonly vocationalPartialUseCase: VocationalPartialUseCase,
    private readonly cuestionaryUseCase: CuestionaryUseCase,
  ) {}

  public getPsychometricTest = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.psychometricUseCase.execute();
      res.status(200).json({ data });
    } catch (error) {
      console.error('Error en getPsychometricTest:', error);
      next(error);
    }
  };

  public getVocationalTest = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.vocationalUseCase.execute();
      res.status(200).json({ data });
    } catch (error) {
      console.error('Error en getVocationalTest:', error);
      next(error);
    }
  };

  public getPartialVocationalTest = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.vocationalPartialUseCase.execute();
      res.status(200).json({ data });
    } catch (error) {
      console.error('Error en getPartialVocationalTest:', error);
      next(error);
    }
  };

  public getCuestionaryTest = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.cuestionaryUseCase.execute();
      res.status(200).json({ data });
    } catch (error) {
      console.error('Error en getCuestionaryTest:', error);
      next(error);
    }
  };
}
