// src/presentation/routes/user.router.ts
import { Router } from 'express';
import { UserController, validateRoleMiddleware } from '../../presentation';
import {
  UserRepository,
  MajorRepository,
} from '../../infrastructure/database/repositories';
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
  UpdateTestResultUseCase,
  UpdateFinalResultUseCase,
  GetRecommendationsUseCase,
  GetPlatformStatsUseCase,
  GetUsersBySupportUseCase,
} from '../../application';
import { logRequest } from '../middleware/logRequest';

const router = Router();

// instance repository
const userRepository = new UserRepository();
const majorRepository = new MajorRepository();

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
const updateTestResultUseCase = new UpdateTestResultUseCase(userRepository);
const updateFinalResultUseCase = new UpdateFinalResultUseCase(userRepository);
const getRecommendationsUseCase = new GetRecommendationsUseCase(
  userRepository,
  majorRepository,
);
const getPlatformStatsUseCase = new GetPlatformStatsUseCase(userRepository);
const getUsersBySupportUseCase = new GetUsersBySupportUseCase(userRepository);

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
  updateTestResultUseCase,
  updateFinalResultUseCase,
  getRecommendationsUseCase,
  getPlatformStatsUseCase,
  getUsersBySupportUseCase,
);

// —————— RUTAS DE CREACIÓN ——————
// Public registration (sin middleware)
router.post(
  '/registry',
  logRequest('/user/registry', 'POST', 'CreateUser'),
  userController.create,
);

// Create user
router.post(
  '/',
  logRequest('/user', 'POST', 'CreateUser'),
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'UNIVERSITY']),
  userController.create,
);

// —————— RUTAS DE LECTURA ESTÁTICAS ——————
// Get all users
router.get(
  '/',
  logRequest('/user', 'GET', 'GetAllUsers'),
  validateRoleMiddleware(['ADMIN', 'VIEWER', 'UNIVERSITY']),
  userController.getAll,
);

// Get all users by support
router.get(
  '/support-users',
  logRequest('/user/support-users', 'GET', 'GetUsersBySupport'),
  validateRoleMiddleware(['ADMIN', 'SUPPORT']),
  userController.getUsersBySupport,
);

// Get students by tutor (usa el token, no recibe ID por URL)
router.get(
  '/students',
  logRequest('/user/students', 'GET', 'GetStudentsByTutor'),
  validateRoleMiddleware(['ADMIN', 'TUTOR']),
  userController.getStudentsByTutor,
);

// Get info managers by university (usa el token o un param interno)
router.get(
  '/infomanagers',
  logRequest('/user/infomanagers', 'GET', 'GetInfoManagersByUniversity'),
  validateRoleMiddleware(['ADMIN', 'UNIVERSITY']),
  userController.getInfoManagersByUniversity,
);

// Get viewers by university
router.get(
  '/viewers',
  logRequest('/user/viewers', 'GET', 'GetViewersByUniversity'),
  validateRoleMiddleware(['ADMIN', 'UNIVERSITY']),
  userController.getViewersByUniversity,
);

// Get marketing by admin (usa el token, no recibe ID por URL)
router.get(
  '/marketing',
  logRequest('/user/marketing', 'GET', 'GetMarketingByAdmin'),
  validateRoleMiddleware(['ADMIN']),
  userController.getMarketingByAdmin,
);

// Get support by admin (usa el token, no recibe ID por URL)
router.get(
  '/support',
  logRequest('/user/support', 'GET', 'GetSupportByAdmin'),
  validateRoleMiddleware(['ADMIN']),
  userController.getSupportByAdmin,
);

// Get finances by admin (usa el token, no recibe ID por URL)
router.get(
  '/finances',
  logRequest('/user/finances', 'GET', 'GetFinancesByAdmin'),
  validateRoleMiddleware(['ADMIN']),
  userController.getFinancesByAdmin,
);

router.get(
  '/recommendations',
  logRequest('/user/recommendations', 'GET', 'GetRecommendations'),
  validateRoleMiddleware(['STUDENT']),
  userController.getRecommendations,
);

router.get(
  '/universities',
  logRequest('/user/universities', 'GET', 'GetAllUniversities'),
  userController.getAllUniversities,
);

// Get platform stats
router.get(
  '/platform-stats',
  logRequest('/user/platform-stats', 'GET', 'GetPlatformStats'),
  validateRoleMiddleware(['ADMIN']),
  userController.getPlatformStats,
);

// —————— RUTAS DE ACTUALIZACIÓN “ESPECIAL” ——————
// Para que cada usuario actualice su propio perfil
router.patch(
  '/',
  logRequest('/user', 'PATCH', 'UpdateUser'),
  validateRoleMiddleware([
    'ADMIN',
    'TUTOR',
    'UNIVERSITY',
    'STUDENT',
    'VIEWER',
    'MARKETING',
    'SUPPORT',
    'FINANCES',
    'INFOMANAGER',
  ]),
  userController.update,
);

router.patch(
  '/form-result',
  logRequest('/user/form-result', 'PATCH', 'UpdateUser'),
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  userController.updateTestResult,
);

router.patch(
  '/final-result',
  logRequest('/user/final-result', 'PATCH', 'UpdateUser'),
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  userController.updateFinalResult,
);

// Update user by Email
router.patch(
  '/by-email/:email',
  logRequest('/user/by-email/:email', 'PATCH', 'UpdateUserByEmail'),
  userController.updateByEmail,
);

// —————— RUTA DE DELETE “ESPECIAL” ——————
router.delete(
  '/',
  logRequest('/user', 'DELETE', 'DeleteUser'),
  validateRoleMiddleware(['ADMIN', 'STUDENT', 'TUTOR', 'UNIVERSITY']),
  userController.delete,
);

// —————— RUTA PARA ELIMINAR USUARIO POR ID ——————
router.delete(
  '/:id',
  logRequest('/user/:id', 'DELETE', 'DeleteUserById'),
  validateRoleMiddleware(['ADMIN', 'TUTOR', 'UNIVERSITY']),
  userController.deleteById,
);

// —————— RUTAS DINÁMICAS (PARÁMETRO :id) ——————

// Get user by ID
router.get(
  '/:id',
  logRequest('/user/:id', 'GET', 'GetUserById'),
  validateRoleMiddleware([
    'ADMIN',
    'STUDENT',
    'VIEWER',
    'TUTOR',
    'UNIVERSITY',
    'MARKETING',
    'SUPPORT',
    'FINANCES',
    'INFOMANAGER',
  ]),
  userController.getById,
);

// Get university By Id
router.get(
  '/universities/:id',
  logRequest('/user/universities/:id', 'GET', 'GetUniversityById'),
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'INFOMANAGER']),
  userController.getUniversityById,
);

// Update user by ID - Para que los usuarios raiz modifiquen la info de sus usuarios creados
router.patch(
  '/:id',
  logRequest('/user/:id', 'PATCH', 'UpdateUserById'),
  validateRoleMiddleware([
    'ADMIN',
    'TUTOR',
    'UNIVERSITY',
    'INFOMANAGER',
    'STUDENT',
  ]),
  userController.updateById,
);

export default router;
