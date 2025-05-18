// src/infrastructure/database/repositories/satisfaction-survey.repository.impl.ts
import { ISatisfactionSurveyRepository } from '../../../domain/repositories/satisfaction-survey.repository';
import {
  SatisfactionSurveyModel,
  SatisfactionSurveyDocument, // Asegúrate de tener esta interfaz exportada
} from '../../database/models/satisfaction-survey.model';
import { SatisfactionSurveyResponseDto } from '../../../application/dtos/satisfaction-survey.dto';
import { Types } from 'mongoose';

export class SatisfactionSurveyRepository
  implements ISatisfactionSurveyRepository
{
  async create(data: {
    user_id: string;
    bucket_id: string;
    responses: number[];
    date: Date;
  }): Promise<SatisfactionSurveyResponseDto> {
    // Especificar el tipo del documento creado
    const survey: SatisfactionSurveyDocument =
      await SatisfactionSurveyModel.create({
        user_id: new Types.ObjectId(data.user_id),
        bucket_id: data.bucket_id,
        responses: data.responses,
        date: data.date,
      });

    return {
      id: survey._id.toString(),
      user_id: survey.user_id.toString(),
      bucket_id: survey.bucket_id,
      date: survey.date.toISOString(),
      responses: survey.responses,
    };
  }

  async findByStudentId(
    studentId: string,
  ): Promise<SatisfactionSurveyResponseDto[]> {
    // Tipar explícitamente el resultado de la consulta
    const surveys: SatisfactionSurveyDocument[] =
      await SatisfactionSurveyModel.find({
        user_id: studentId,
      }).exec();

    return surveys.map(this.mapToDto);
  }

  // Definir tipo específico para el documento
  private mapToDto(
    survey: SatisfactionSurveyDocument,
  ): SatisfactionSurveyResponseDto {
    return {
      id: survey._id.toString(),
      user_id: survey.user_id.toString(),
      bucket_id: survey.bucket_id,
      responses: survey.responses,
      date: survey.date.toISOString(),
    };
  }
}
