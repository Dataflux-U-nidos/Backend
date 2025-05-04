import { Request, Response, NextFunction } from 'express';
import { PsychometricUseCase, VocationalUseCase, VocationalPartialUseCase } from '../../application';


export class StudentTestController {
  constructor(
    private readonly psychometricUseCase: PsychometricUseCase,
    private readonly vocationalUseCase: VocationalUseCase,
    private readonly vocationalPartialUseCase: VocationalPartialUseCase,
  ) {}

}
