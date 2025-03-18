import { CommentRepository } from '../../../infrastructure';
import { Comment } from '../../../domain';

export class GetCommentByIdUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(id: string): Promise<Comment | null> {
    return this.commentRepository.findById(id);
  }
}
