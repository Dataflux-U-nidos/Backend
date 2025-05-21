import { Router } from 'express';
import { CommentController, validateRoleMiddleware } from '../../presentation';
import { CommentRepository } from '../../infrastructure/database/repositories';
import {
  CreateCommentUseCase,
  GetAllCommentsUseCase,
  GetCommentByIdUseCase,
  UpdateCommentUseCase,
  DeleteCommentUseCase,
  GetCommentsByMajorUseCase,
} from '../../application';

const router = Router();

const commentRepository = new CommentRepository();

const createCommentUseCase = new CreateCommentUseCase(commentRepository);
const getAllCommentsUseCase = new GetAllCommentsUseCase(commentRepository);
const getCommentByIdUseCase = new GetCommentByIdUseCase(commentRepository);
const updateCommentUseCase = new UpdateCommentUseCase(commentRepository);
const deleteCommentUseCase = new DeleteCommentUseCase(commentRepository);
const getCommentsByMajorUseCase = new GetCommentsByMajorUseCase(
  commentRepository,
);

const commentController = new CommentController(
  createCommentUseCase,
  getAllCommentsUseCase,
  getCommentByIdUseCase,
  updateCommentUseCase,
  deleteCommentUseCase,
  getCommentsByMajorUseCase,
);

// Defining routes with middleware validation and assigning controller methods
router.get(
  '/',
  validateRoleMiddleware(['ADMIN', 'STUDENT']),
  commentController.getAll,
);
router.get(
  '/major/:majorId',
  validateRoleMiddleware(['ADMIN', 'STUDENT']),
  commentController.getByMajor,
);
router.get(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT']),
  commentController.getById,
);
router.post('/', validateRoleMiddleware(['STUDENT']), commentController.create);
router.patch(
  '/:id',
  validateRoleMiddleware(['STUDENT']),
  commentController.update,
);
router.delete(
  '/:id',
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  commentController.delete,
);

export default router;
