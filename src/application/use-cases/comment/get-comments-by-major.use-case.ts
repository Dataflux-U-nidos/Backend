// src/application/use-cases/GetCommentsByMajorUseCase.ts
import { ICommentRepository } from '../../../domain';
import { CommentResponseDto } from '../../dtos';

export class GetCommentsByMajorUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}
  /**
   * Devuelve todos los comentarios asociados al majorId,
   * ya ordenados por createdAt descendente.
   */
  public async execute(majorId: string): Promise<CommentResponseDto[]> {
    return this.commentRepository.findByMajor(majorId);
  }
}
