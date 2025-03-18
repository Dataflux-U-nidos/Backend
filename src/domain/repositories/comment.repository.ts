import { Comment } from '../../domain';

export interface ICommentRepository {
  findAll(): Promise<Comment[]>;
  findById(id: string): Promise<Comment | null>;
  create(data: Omit<Comment, 'id'>): Promise<Comment>;
  update(
    id: string,
    data: Partial<Omit<Comment, 'id'>>,
  ): Promise<Comment | null>;
  delete(id: string): Promise<boolean>;
}
