import { CommentResponseDto } from '../../application/dtos'; // Asegúrate de importar desde la ruta correcta
import { Comment } from '../../domain';

export interface ICommentRepository {
  findAll(): Promise<CommentResponseDto[]>; // 🔹 Devuelve DTOs en lugar de Comment[]
  findById(id: string): Promise<CommentResponseDto | null>; // 🔹 También usa DTO
  create(data: Omit<Comment, 'id'>): Promise<Comment>;
  update(
    id: string,
    data: Partial<Omit<Comment, 'id'>>,
  ): Promise<Comment | null>;
  delete(id: string): Promise<boolean>;
}
