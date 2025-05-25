import { Router } from 'express';
import { MajorController, validateRoleMiddleware } from '../../presentation';
import {
  MajorRepository,
  UserRepository,
} from '../../infrastructure/database/repositories';
import {
  CreateMajorUseCase,
  GetAllMajorsUseCase,
  GetMajorByIdUseCase,
  UpdateMajorUseCase,
  DeleteMajorUseCase,
  GetMajorsByInstitutionUseCase,
  GetUserByIdUseCase,
  AddJobOpportunityToMajorUseCase,
} from '../../application';
import { logRequest } from '../middleware/logRequest';

const router = Router();

const majorRepository = new MajorRepository();
const userRepository = new UserRepository(); // Assuming you have a UserRepository

const createMajorUseCase = new CreateMajorUseCase(majorRepository);
const getAllMajorsUseCase = new GetAllMajorsUseCase(majorRepository);
const getMajorByIdUseCase = new GetMajorByIdUseCase(majorRepository);
const updateMajorUseCase = new UpdateMajorUseCase(majorRepository);
const deleteMajorUseCase = new DeleteMajorUseCase(majorRepository);
const getMajorsByUniversityUseCase = new GetMajorsByInstitutionUseCase(
  majorRepository,
);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const addJobOpportunityToMajorUseCase = new AddJobOpportunityToMajorUseCase(
  majorRepository,
);

const majorController = new MajorController(
  createMajorUseCase,
  getAllMajorsUseCase,
  getMajorByIdUseCase,
  updateMajorUseCase,
  deleteMajorUseCase,
  getMajorsByUniversityUseCase,
  getUserByIdUseCase,
  addJobOpportunityToMajorUseCase,
);

// Defining routes with middleware validation and assigning controller methods
router.get(
  '/',
  logRequest('/major', 'GET', 'GetAllMajors'),
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'INFOMANAGER']),
  majorController.getAll,
);
router.get(
  '/:id',
  logRequest('/major/:id', 'GET', 'GetMajorById'),
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'INFOMANAGER']),
  majorController.getById,
);

router.get(
  '/university/:institutionId',
  logRequest('/major/university/:institutionId', 'GET', 'GetMajorsByInstitution'),
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  majorController.getByInstitution,
);

router.post(
  '/',
  logRequest('/major', 'POST', 'CreateMajor'),
  validateRoleMiddleware(['INFOMANAGER']),
  majorController.create,
);

// src/presentation/routes/major.routes.ts
router.patch(
  '/job-opportunities/:id',
  logRequest(
    '/major/job-opportunities/:id',
    'PATCH',
    'AddJobOpportunityToMajor',
  ),
  validateRoleMiddleware(['INFOMANAGER', 'ADMIN']),
  majorController.addJobOpportunity,
);

router.patch(
  '/:id',
  logRequest('/major/:id', 'PATCH', 'UpdateMajor'),
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  majorController.update,
);

router.delete(
  '/:id',
  logRequest('/major/:id', 'DELETE', 'DeleteMajor'),
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  majorController.delete,
);

export default router;
