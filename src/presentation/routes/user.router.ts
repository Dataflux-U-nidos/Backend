// src/presentation/routes/user.router.ts
import { Router } from 'express';
import { UserController, validateRoleMiddleware } from '../../presentation';
import { UserRepository } from '../../infrastructure/database/repositories';
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetStudentsByTutorUseCase,
  AddStudentToTutorUseCase,
} from '../../application';

const router = Router();

// instance repository
const userRepository = new UserRepository();

// instance use cases
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const getStudentsByTutorUseCase = new GetStudentsByTutorUseCase(userRepository);
const addStudentToTutorUseCase = new AddStudentToTutorUseCase(userRepository);

// Instance controller with use cases injected
const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  getStudentsByTutorUseCase,
  addStudentToTutorUseCase,
);

// Defining routes with middleware validation and assigning controller methods
router.get(
  '/',
  validateRoleMiddleware(['ADMIN', 'VIEWER']),
  userController.getAll,
);
router.get(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'VIEWER', 'TUTOR']),
  userController.getById,
);
router.get(
  '/:id/students',
  validateRoleMiddleware(['ADMIN', 'TUTOR']),
  userController.getStudentsByTutor,
);
router.post(
  '/',
  validateRoleMiddleware(['ADMIN', 'TUTOR']),
  userController.create,
);
router.patch(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'TUTOR']),
  userController.update,
);
router.delete(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'TUTOR']),
  userController.delete,
);

export default router;
