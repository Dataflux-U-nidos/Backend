import { ICommentRepository } from '../../../domain';
import { CommentResponseDto } from '../../dtos';

export class GetAllCommentsUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  public async execute(): Promise<CommentResponseDto[]> {
    return this.commentRepository.findAll();
  }
}
