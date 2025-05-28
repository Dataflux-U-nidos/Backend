// src/domain/repositories/satisfaction-survey.repository.ts
import {
  SatisfactionSurveyResponseDto,
  SurveyStatsResponseDto,
} from '../../application/dtos/satisfaction-survey.dto';

export interface ISatisfactionSurveyRepository {
  /**
   * Crea una nueva encuesta de satisfacción
   * @param data Datos de la encuesta
   */
  create(data: {
    user_id: string;
    bucket_id: string;
    responses: number[];
    date: Date;
  }): Promise<SatisfactionSurveyResponseDto>;

  /**
   * Obtiene todas las encuestas de un estudiante
   * @param studentId ID del estudiante
   */
  findByStudentId(studentId: string): Promise<SatisfactionSurveyResponseDto[]>;

  getSurveyStats(): Promise<SurveyStatsResponseDto>;

  /**
   * Opcional: Métodos adicionales según necesidades
   */
  // findById(id: string): Promise<SatisfactionSurveyResponseDto | null>;
  // delete(id: string): Promise<boolean>;
  // update(id: string, data: Partial<CreateSatisfactionSurveyDto>): Promise<SatisfactionSurveyResponseDto | null>;
}
