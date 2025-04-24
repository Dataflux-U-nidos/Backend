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
const updateUserByEmailUseCase = new UpdateUserByEmailUseCase(userRepository);
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
  updateUserByEmailUseCase,
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

// Create user
router.post(
  '/',
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'UNIVERSITY']),
  userController.create,
);

// Public registration (sin middleware)
router.post('/registry', userController.create);

// Get all users
router.get(
  '/',
  validateRoleMiddleware(['ADMIN', 'VIEWER', 'UNIVERSITY']),
  userController.getAll,
);

// Get user by ID
router.get(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'VIEWER', 'TUTOR', 'UNIVERSITY']),
  userController.getById,
);

// Update user by ID
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

// Update user by Email
router.patch(
  '/by-email/:email',
  userController.updateByEmail,
);

// Delete user
router.delete(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'TUTOR', 'UNIVERSITY']),
  userController.delete,
);

// Get students by tutor ID
router.get(
  '/:id/students',
  validateRoleMiddleware(['ADMIN', 'TUTOR']),
  userController.getStudentsByTutor,
);

// Get info managers by university ID
router.get(
  '/:id/infomanagers',
  validateRoleMiddleware(['ADMIN', 'UNIVERSITY']),
  userController.getInfoManagersByUniversity,
);

// Get viewers by university ID
router.get(
  '/:id/viewers',
  validateRoleMiddleware(['ADMIN', 'UNIVERSITY']),
  userController.getViewersByUniversity,
);

// Optionally, here you could add POSTs to assign students or viewers if needed
// router.post('/:id/students', ...) etc.

export default router;
