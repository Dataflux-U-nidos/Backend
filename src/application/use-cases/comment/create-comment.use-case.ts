import { CommentRepository } from '../../../infrastructure';
import { Comment } from '../../../domain';

export class CreateCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(data: Omit<Comment, 'id'>): Promise<Comment> {
    // Lógica de negocio adicional (si es necesaria) antes de crear
    return this.commentRepository.create(data);
  }
}
