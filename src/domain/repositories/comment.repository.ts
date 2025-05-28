// src/domain/ICommentRepository.ts
import { CommentResponseDto } from '../../application/dtos';
import { Comment } from '../entities/comment.entity';

export interface ICommentRepository {
  findAll(): Promise<CommentResponseDto[]>;
  findById(id: string): Promise<CommentResponseDto | null>;

  // ← CAMBIO: ahora devuelve el DTO, no el domain Comment
  create(data: Omit<Comment, 'id'>): Promise<CommentResponseDto>;

  // Si quieres, haz lo mismo en update:
  update(
    id: string,
    data: Partial<Omit<Comment, 'id'>>,
  ): Promise<CommentResponseDto | null>;

  delete(id: string): Promise<boolean>;
  findByMajor(majorId: string): Promise<CommentResponseDto[]>;
}
