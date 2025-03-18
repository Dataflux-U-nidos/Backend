import { CommentRepository } from '../../../infrastructure';

export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.commentRepository.delete(id);
  }
}
