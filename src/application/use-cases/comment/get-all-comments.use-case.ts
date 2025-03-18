import { CommentRepository } from '../../../infrastructure';
import { Comment } from '../../../domain';

export class GetAllCommentsUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(): Promise<Comment[]> {
    return this.commentRepository.findAll();
  }
}
