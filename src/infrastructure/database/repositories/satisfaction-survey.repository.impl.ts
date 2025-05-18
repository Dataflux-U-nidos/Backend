// src/infrastructure/database/repositories/satisfaction-survey.repository.impl.ts
import { ISatisfactionSurveyRepository } from '../../../domain/repositories/satisfaction-survey.repository';
import {
  SatisfactionSurveyModel,
  SatisfactionSurveyDocument, // Asegúrate de tener esta interfaz exportada
} from '../../database/models/satisfaction-survey.model';
import {
  SatisfactionSurveyResponseDto,
  SurveyStatsResponseDto,
} from '../../../application/dtos/satisfaction-survey.dto';
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

  async getSurveyStats(): Promise<SurveyStatsResponseDto> {
    const aggregationResult = await SatisfactionSurveyModel.aggregate([
      {
        $group: {
          _id: null,
          totalRespondents: { $addToSet: '$user_id' },
          allResponses: { $push: '$responses' },
        },
      },
      {
        $project: {
          totalRespondents: { $size: '$totalRespondents' },
          allResponses: 1,
        },
      },
    ]);

    const stats = aggregationResult[0] ?? {
      totalRespondents: 0,
      allResponses: [],
    };

    const questionStats = [0, 1, 2, 3].map((questionIndex) => {
      const questionResponses: number[] = (stats.allResponses as number[][])
        .flat()
        .filter((_, index: number) => index % 4 === questionIndex);

      return this.calculateQuestionStats(questionIndex, questionResponses);
    });

    return {
      totalRespondents: stats.totalRespondents,
      questionStats,
    };
  }

  private calculateQuestionStats(questionIndex: number, responses: number[]) {
    const sorted = [...responses].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const average = sum / sorted.length || 0;

    const middle = Math.floor(sorted.length / 2);
    let median = 0;
    if (sorted.length) {
      if (sorted.length % 2 !== 0) {
        median = sorted[middle];
      } else {
        median = (sorted[middle - 1] + sorted[middle]) / 2;
      }
    }

    const frequencyMap = sorted.reduce(
      (acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const modeEntry = Object.entries(frequencyMap).reduce<[string, number]>(
      (a, b) => (a[1] > b[1] ? a : b),
      ['0', 0],
    );
    const mode = Number(modeEntry[0]);

    const distribution = [1, 2, 3, 4, 5].reduce(
      (acc, val) => {
        acc[val.toString() as '1' | '2' | '3' | '4' | '5'] =
          frequencyMap[val] || 0;
        return acc;
      },
      {} as { '1': number; '2': number; '3': number; '4': number; '5': number },
    );

    return {
      questionIndex,
      average: Number(average.toFixed(2)),
      median: Number(median.toFixed(2)),
      mode: Number(mode),
      distribution,
    };
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
