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
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'INFOMANAGER']),
  majorController.getAll,
);
router.get(
  '/:id',
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'INFOMANAGER']),
  majorController.getById,
);

router.get(
  '/university/:institutionId',
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  majorController.getByInstitution,
);

router.post(
  '/',
  validateRoleMiddleware(['INFOMANAGER']),
  majorController.create,
);

// src/presentation/routes/major.routes.ts
router.patch(
  '/job-opportunities/:id',
  validateRoleMiddleware(['INFOMANAGER', 'ADMIN']),
  majorController.addJobOpportunity,
);

router.patch(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  majorController.update,
);

router.delete(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  majorController.delete,
);

export default router;
