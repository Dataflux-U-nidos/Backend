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

// —————— RUTAS DE CREACIÓN ——————
// Public registration (sin middleware)
router.post('/registry', userController.create);

// Create user
router.post(
  '/',
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'UNIVERSITY']),
  userController.create,
);

// —————— RUTAS DE LECTURA ESTÁTICAS ——————
// Get all users
router.get(
  '/',
  validateRoleMiddleware(['ADMIN', 'VIEWER', 'UNIVERSITY']),
  userController.getAll,
);

// Get students by tutor (usa el token, no recibe ID por URL)
router.get(
  '/students',
  validateRoleMiddleware(['ADMIN', 'TUTOR']),
  userController.getStudentsByTutor,
);

// Get info managers by university (usa el token o un param interno)
router.get(
  '/infomanagers',
  validateRoleMiddleware(['ADMIN', 'UNIVERSITY']),
  userController.getInfoManagersByUniversity,
);

// Get viewers by university
router.get(
  '/viewers',
  validateRoleMiddleware(['ADMIN', 'UNIVERSITY']),
  userController.getViewersByUniversity,
);

// Get marketing by admin (usa el token, no recibe ID por URL)
router.get(
  '/marketing',
  validateRoleMiddleware(['ADMIN']),
  userController.getMarketingByAdmin,
);

// Get support by admin (usa el token, no recibe ID por URL)
router.get(
  '/support',
  validateRoleMiddleware(['ADMIN']),
  userController.getSupportByAdmin,
);

// Get finances by admin (usa el token, no recibe ID por URL)
router.get(
  '/finances',
  validateRoleMiddleware(['ADMIN']),
  userController.getFinancesByAdmin,
);

// —————— RUTAS DE ACTUALIZACIÓN “ESPECIAL” ——————
// Para que cada usuario actualice su propio perfil
router.patch(
  '/',
  validateRoleMiddleware([
    'ADMIN',
    'TUTOR',
    'UNIVERSITY',
    'STUDENT',
    'VIEWER',
    'MARKETING',
    'SUPPORT',
    'FINANCES',
  ]),
  userController.update,
);

// Update user by Email
router.patch('/by-email/:email', userController.updateByEmail);

// —————— RUTAS DINÁMICAS (PARÁMETRO :id) ——————
// Get user by ID
router.get(
  '/:id',
  validateRoleMiddleware([
    'ADMIN',
    'STUDENT',
    'VIEWER',
    'TUTOR',
    'UNIVERSITY',
    'MARKETING',
    'SUPPORT',
    'FINANCES',
  ]),
  userController.getById,
);

// Update user by ID - Para que los usuarios raiz modifiquen la info de sus usuarios creados
router.patch(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'UNIVERSITY']),
  userController.updateById,
);

// Delete user by ID

router.delete(
  '/',
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'UNIVERSITY']),
  userController.delete,
);

export default router;
