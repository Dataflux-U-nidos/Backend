// src/application/use-cases/CreateCommentUseCase.ts

import { ICommentRepository } from '../../../domain';
import { CommentResponseDto, CreateCommentDto } from '../../dtos';

export class CreateCommentUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  // Ahora: primero userId, luego payload sin userId
  public async execute(
    userId: string,
    dto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    // Construyo el objeto que va al repositorio
    const toCreate = {
      userId,
      majorId: dto.majorId,
      text: dto.text,
    };
    return this.commentRepository.create(toCreate);
  }
}
