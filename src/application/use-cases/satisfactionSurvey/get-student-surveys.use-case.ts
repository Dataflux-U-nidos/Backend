// src/application/use-cases/satisfaction-survey/get-student-surveys.use-case.ts
import { ISatisfactionSurveyRepository } from '../../../domain/repositories/satisfaction-survey.repository';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { SatisfactionSurveyResponseDto } from '../../dtos/satisfaction-survey.dto';

export class GetStudentSurveysUseCase {
  constructor(
    private readonly surveyRepository: ISatisfactionSurveyRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(studentId: string): Promise<SatisfactionSurveyResponseDto[]> {
    try {
      // Validar estudiante
      const student = await this.userRepository.findById(studentId);

      if (!student) {
        throw new Error('Estudiante no encontrado');
      }

      if (student.userType !== 'STUDENT') {
        throw new Error('El usuario no es un estudiante');
      }

      // Obtener encuestas desde el repositorio de encuestas
      const surveys = await this.surveyRepository.findByStudentId(studentId);

      return surveys.map((survey) => ({
        id: survey.id,
        user_id: survey.user_id,
        bucket_id: survey.bucket_id,
        date: survey.date,
        responses: survey.responses, // Ensure survey.responses is an array of numbers
      }));
    } catch (error) {
      console.error('Error obteniendo encuestas:', error);
      throw new Error('Error al obtener encuestas');
    }
  }
}
