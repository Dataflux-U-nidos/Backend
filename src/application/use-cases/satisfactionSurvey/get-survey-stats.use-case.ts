// src/application/use-cases/satisfaction-survey/get-survey-stats.use-case.ts
import { ISatisfactionSurveyRepository } from '../../../domain/repositories/satisfaction-survey.repository';
import { SurveyStatsResponseDto } from '../../dtos/satisfaction-survey.dto';

export class GetSurveyStatsUseCase {
  constructor(private readonly repository: ISatisfactionSurveyRepository) {}

  async execute(): Promise<SurveyStatsResponseDto> {
    try {
      return await this.repository.getSurveyStats();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error('Error obteniendo estadísticas: ' + errorMessage);
    }
  }
}
