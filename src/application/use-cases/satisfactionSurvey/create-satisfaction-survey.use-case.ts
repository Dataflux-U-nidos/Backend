// src/application/use-cases/satisfaction-survey/create-satisfaction-survey.use-case.ts
import { ISatisfactionSurveyRepository } from '../../../domain/repositories/satisfaction-survey.repository';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { SatisfactionSurveyResponseDto } from '../../dtos/satisfaction-survey.dto';

export class CreateSatisfactionSurveyUseCase {
  constructor(
    private readonly surveyRepository: ISatisfactionSurveyRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: {
    studentId: string;
    bucket_id: string;
    responses: number[];
  }): Promise<SatisfactionSurveyResponseDto> {
    try {
      const { studentId, bucket_id, responses } = params;

      // 1. Validar estructura de las respuestas
      if (responses.length !== 4) {
        throw new Error('Debe proporcionar exactamente 4 respuestas');
      }

      if (responses.some((r) => r < 1 || r > 5)) {
        throw new Error('Las respuestas deben estar entre 1 y 5');
      }

      // 2. Validar existencia y tipo de usuario
      const student = await this.userRepository.findById(studentId);
      if (!student) {
        throw new Error('Estudiante no encontrado');
      }

      if (student.userType !== 'STUDENT') {
        throw new Error('El usuario no es un estudiante');
      }

      // 3. Crear encuesta
      const newSurvey = await this.surveyRepository.create({
        user_id: studentId,
        bucket_id,
        responses,
        date: new Date(),
      });

      // 4. Actualizar relación con el estudiante
      await this.userRepository.addSurveyToStudent(studentId, newSurvey.id);

      // 5. Formatear respuesta
      return {
        id: newSurvey.id,
        user_id: newSurvey.user_id, // Debe coincidir con el DTO
        bucket_id: newSurvey.bucket_id,
        date: newSurvey.date,
        responses: newSurvey.responses,
      };
    } catch (error) {
      // Manejo de errores específicos
      if (error instanceof Error) {
        // Detectar errores de duplicidad (si aplica)
        if (error.message.includes('duplicate')) {
          throw new Error('No se puede crear una encuesta duplicada');
        }
        // Propagamos el mensaje original
        throw new Error(error.message);
      }
      throw new Error('Error desconocido al crear la encuesta');
    }
  }
}
