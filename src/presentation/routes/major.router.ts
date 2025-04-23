import { Router } from 'express';
import { MajorController, validateRoleMiddleware } from '../../presentation';
import { MajorRepository } from '../../infrastructure/database/repositories';
import {
  CreateMajorUseCase,
  GetAllMajorsUseCase,
  GetMajorByIdUseCase,
  UpdateMajorUseCase,
  DeleteMajorUseCase,
} from '../../application';

const router = Router();

const majorRepository = new MajorRepository();

const createMajorUseCase = new CreateMajorUseCase(majorRepository);
const getAllMajorsUseCase = new GetAllMajorsUseCase(majorRepository);
const getMajorByIdUseCase = new GetMajorByIdUseCase(majorRepository);
const updateMajorUseCase = new UpdateMajorUseCase(majorRepository);
const deleteMajorUseCase = new DeleteMajorUseCase(majorRepository);

const majorController = new MajorController(
  createMajorUseCase,
  getAllMajorsUseCase,
  getMajorByIdUseCase,
  updateMajorUseCase,
  deleteMajorUseCase,
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
router.post(
  '/',
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  majorController.create,
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
