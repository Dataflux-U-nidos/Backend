// src/presentation/routes/user.router.ts
import { Router } from 'express';
import { UserController, validateRoleMiddleware } from '../../presentation';
import { UserRepository } from '../../infrastructure/database/repositories';
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  UpdateUserByEmailUseCase,
  DeleteUserUseCase,
} from '../../application';

const router = Router();

// instance repository
const userRepository = new UserRepository();

// instance use cases
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const updateUserByEmailUseCase = new UpdateUserByEmailUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

// Instance controller with use cases injected
const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  updateUserByEmailUseCase,
  deleteUserUseCase,
);

// Defining routes with middleware validation and assigning controller methods
router.get(
  '/',
  validateRoleMiddleware(['ADMIN', 'VIEWER']),
  userController.getAll,
);

router.get(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'VIEWER']),
  userController.getById,
);

router.post('/', userController.create);

router.patch(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT']),
  userController.update,
);
router.patch('/by-email/:email', userController.updateByEmail); 

router.delete(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT']),
  userController.delete,
);

export default router;
