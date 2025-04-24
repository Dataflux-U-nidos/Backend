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
  AddInfoManagerToUniversityUseCase,
  AddViewerToUniversityUseCase,
  GetInfoManagersByUniversityUseCase,
  GetViewersByUniversityUseCase,
  AddMarketingToAdminUseCase,
  GetMarketingByAdminUseCase,
  AddSupportToAdminUseCase,
  GetSupportByAdminUseCase,
  AddFinancesToAdminUseCase,
  GetFinancesByAdminUseCase,
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
const addInfoManagerToUniversityUseCase = new AddInfoManagerToUniversityUseCase(
  userRepository,
);
const addViewerToUniversityUseCase = new AddViewerToUniversityUseCase(
  userRepository,
);
const getInfoManagersByUniversityUseCase =
  new GetInfoManagersByUniversityUseCase(userRepository);
const getViewersByUniversityUseCase = new GetViewersByUniversityUseCase(
  userRepository,
);
const addMarketingToAdminUseCase = new AddMarketingToAdminUseCase(
  userRepository,
);
const getMarketingByAdminUseCase = new GetMarketingByAdminUseCase(
  userRepository,
);
const addSupportToAdminUseCase = new AddSupportToAdminUseCase(userRepository);
const getSupportByAdminUseCase = new GetSupportByAdminUseCase(userRepository);
const addFinancesToAdminUseCase = new AddFinancesToAdminUseCase(userRepository);
const getFinancesByAdminUseCase = new GetFinancesByAdminUseCase(userRepository);

// Instance controller with use cases injected
const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  getStudentsByTutorUseCase,
  addStudentToTutorUseCase,
  addInfoManagerToUniversityUseCase,
  addViewerToUniversityUseCase,
  getInfoManagersByUniversityUseCase,
  getViewersByUniversityUseCase,
  addMarketingToAdminUseCase,
  getMarketingByAdminUseCase,
  addSupportToAdminUseCase,
  getSupportByAdminUseCase,
  addFinancesToAdminUseCase,
  getFinancesByAdminUseCase,
);

// Defining routes with middleware validation and assigning controller methods
router.get(
  '/',
  validateRoleMiddleware(['ADMIN', 'VIEWER']),
  userController.getAll,
);
router.get(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'VIEWER', 'TUTOR', 'UNIVERSITY']),
  userController.getById,
);
router.get(
  '/:id/students',
  validateRoleMiddleware(['ADMIN', 'TUTOR']),
  userController.getStudentsByTutor,
);
router.get(
  '/:id/infomanagers',
  validateRoleMiddleware(['ADMIN', 'UNIVERSITY']),
  userController.getInfoManagersByUniversity,
);
router.get(
  '/:id/viewers',
  validateRoleMiddleware(['ADMIN', 'UNIVERSITY']),
  userController.getViewersByUniversity,
);
router.post(
  '/',
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'UNIVERSITY']),
  userController.create,
);
router.post('/registry', userController.create);
router.patch(
  '/:id',
  validateRoleMiddleware([
    'ADMIN',
    'STUDENT',
    'TUTOR',
    'UNIVERSITY',
    'VIEWER',
    'INFOMANAGER',
    'MARKETING',
    'SUPPORT',
    'FINANCES',
  ]),
  userController.update,
);
router.delete(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'TUTOR', 'UNIVERSITY']),
  userController.delete,
);

export default router;
