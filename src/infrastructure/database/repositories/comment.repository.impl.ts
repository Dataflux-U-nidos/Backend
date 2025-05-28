// src/infrastructure/database/repositories/CommentRepository.ts
import { CommentModel } from '../../../infrastructure';
import { Comment, ICommentRepository } from '../../../domain';
import { CommentResponseDto } from '../../../application/dtos';

export class CommentRepository implements ICommentRepository {
  public async findAll(): Promise<CommentResponseDto[]> {
    const docs = await CommentModel.find({}).sort({ createdAt: -1 });
    return docs.map((doc) => ({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      majorId: doc.majorId.toString(),
      text: doc.text,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }

  public async findById(id: string): Promise<CommentResponseDto | null> {
    const doc = await CommentModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      majorId: doc.majorId.toString(),
      text: doc.text,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async create(data: Omit<Comment, 'id'>): Promise<CommentResponseDto> {
    const doc = await CommentModel.create(data);
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      majorId: doc.majorId.toString(),
      text: doc.text,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async update(
    id: string,
    data: Partial<Omit<Comment, 'id'>>,
  ): Promise<CommentResponseDto | null> {
    const doc = await CommentModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      majorId: doc.majorId.toString(),
      text: doc.text,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await CommentModel.findByIdAndDelete(id);
    return result !== null;
  }

  public async findByMajor(majorId: string): Promise<CommentResponseDto[]> {
    const docs = await CommentModel.find({ majorId }).sort({ createdAt: -1 }); // más recientes primero

    return docs.map((doc) => ({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      majorId: doc.majorId.toString(),
      text: doc.text,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }
}
