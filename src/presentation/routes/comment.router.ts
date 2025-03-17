import { Router } from 'express';
import { CommentController } from '../../presentation';
import { CommentRepository } from '../../infrastructure/database/repositories';
import {
  CreateCommentUseCase,
  GetAllCommentsUseCase,
  GetCommentByIdUseCase,
  UpdateCommentUseCase,
  DeleteCommentUseCase,
} from '../../application';

const router = Router();

const commentRepository = new CommentRepository();

const createCommentUseCase = new CreateCommentUseCase(commentRepository);
const getAllCommentsUseCase = new GetAllCommentsUseCase(commentRepository);
const getCommentByIdUseCase = new GetCommentByIdUseCase(commentRepository);
const updateCommentUseCase = new UpdateCommentUseCase(commentRepository);
const deleteCommentUseCase = new DeleteCommentUseCase(commentRepository);

const commentController = new CommentController(
  createCommentUseCase,
  getAllCommentsUseCase,
  getCommentByIdUseCase,
  updateCommentUseCase,
  deleteCommentUseCase,
);

router.get('/', commentController.getAll);
router.get('/:id', commentController.getById);
router.post('/', commentController.create);
router.patch('/:id', commentController.update);
router.delete('/:id', commentController.delete);

export default router;
