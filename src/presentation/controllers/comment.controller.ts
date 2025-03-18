import { Request, Response, NextFunction } from 'express';
import {
  CreateCommentUseCase,
  GetAllCommentsUseCase,
  GetCommentByIdUseCase,
  UpdateCommentUseCase,
  DeleteCommentUseCase,
} from '../../application';

export class CommentController {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly getAllCommentsUseCase: GetAllCommentsUseCase,
    private readonly getCommentByIdUseCase: GetCommentByIdUseCase,
    private readonly updateCommentUseCase: UpdateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
  ) {}

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const comments = await this.getAllCommentsUseCase.execute();
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const comment = await this.getCommentByIdUseCase.execute(id);
      if (!comment) {
        res.status(404).json({ message: 'Comentario no encontrado' });
      } else {
        res.status(200).json(comment);
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newComment = await this.createCommentUseCase.execute(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedComment = await this.updateCommentUseCase.execute(id, req.body);
      if (!updatedComment) {
        res.status(404).json({ message: 'Comentario no encontrado' });
      } else {
        res.status(200).json(updatedComment);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deleteCommentUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'Comentario no encontrado' });
      } else {
        res.status(200).json({ message: 'Comentario eliminado correctamente' });
      }
    } catch (error) {
      next(error);
    }
  };
}
