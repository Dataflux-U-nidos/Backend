// src/presentation/controllers/satisfaction-survey.controller.ts
import { Request, Response, NextFunction } from 'express';
import {
  CreateSatisfactionSurveyUseCase,
  GetStudentSurveysUseCase,
} from '../../application/use-cases';
import { CreateSatisfactionSurveyDto } from '../../application/dtos/satisfaction-survey.dto';
import { UserType } from '../../domain';

interface RequestWithUser extends Request {
  user?: { id: string; userType: UserType };
}

export class SatisfactionSurveyController {
  constructor(
    private readonly createSurveyUseCase: CreateSatisfactionSurveyUseCase,
    private readonly getSurveysUseCase: GetStudentSurveysUseCase,
  ) {}

  public create = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // 1. Obtener ID del estudiante desde el token
      const studentId = req.user?.id;
      if (!studentId) {
        res.status(401).json({ message: 'No autenticado' });
        return;
      }

      // 2. Validar rol del usuario (solo estudiantes pueden crear encuestas)
      if (req.user?.userType !== 'STUDENT') {
        res.status(403).json({
          message: 'Acceso denegado: Solo estudiantes pueden crear encuestas',
        });
        return;
      }

      // 3. Extraer datos del body (sin user_id)
      const { bucket_id, responses } = req.body as CreateSatisfactionSurveyDto;

      // 4. Ejecutar caso de uso
      const survey = await this.createSurveyUseCase.execute({
        studentId,
        bucket_id,
        responses,
      });

      res.status(201).json(survey);
    } catch (error) {
      next(error);
    }
  };

  public getByStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { studentId } = req.params;
      const surveys = await this.getSurveysUseCase.execute(studentId);
      res.status(200).json(surveys);
    } catch (error) {
      next(error);
    }
  };
}
