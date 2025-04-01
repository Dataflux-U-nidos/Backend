import { ICommentRepository } from '../../../domain';

export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.commentRepository.delete(id);
  }
}
