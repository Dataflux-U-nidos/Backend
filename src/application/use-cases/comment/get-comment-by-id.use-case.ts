import { ICommentRepository } from '../../../domain';
import { CommentResponseDto } from '../../dtos';

export class GetCommentByIdUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  public async execute(id: string): Promise<CommentResponseDto | null> {
    return this.commentRepository.findById(id);
  }
}
