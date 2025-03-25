import { CommentModel } from '../../../infrastructure';
import { Comment, ICommentRepository } from '../../../domain';

export class CommentRepository implements ICommentRepository {
  public async findAll(): Promise<Comment[]> {
    const results = await CommentModel.find({});
    return results.map((doc) => ({
      id: doc._id as unknown as string,
      userId: doc.userId as unknown as string,
      text: doc.text,
      date: doc.date,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  public async findById(id: string): Promise<Comment | null> {
    const doc = await CommentModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id as unknown as string,
      userId: doc.userId as unknown as string,
      text: doc.text,
      date: doc.date,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async create(data: Omit<Comment, 'id'>): Promise<Comment> {
    const doc = await CommentModel.create(data);
    return {
      id: doc._id as unknown as string,
      ...data,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async update(
    id: string,
    data: Partial<Omit<Comment, 'id'>>,
  ): Promise<Comment | null> {
    const doc = await CommentModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id as unknown as string,
      userId: doc.userId as unknown as string,
      text: doc.text,
      date: doc.date,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await CommentModel.findByIdAndDelete(id);
    return result !== null;
  }
}
