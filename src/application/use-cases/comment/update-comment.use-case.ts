import { CommentRepository } from '../../../infrastructure';
import { Comment } from '../../../domain';

export class UpdateCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(
    id: string, 
    data: Partial<Omit<Comment, 'id'>>
  ): Promise<Comment | null> {
    return this.commentRepository.update(id, data);
  }
}
