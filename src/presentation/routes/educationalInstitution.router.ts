import { Router } from 'express';
import { EducationalInstitutionController } from '../controllers/educationalInstitution.controller';
import { EducationalInstitutionRepository } from '../../infrastructure/database/repositories/educationalInstitution.repository.impl';
import {
  CreateEducationalInstitutionUseCase,
  GetAllEducationalInstitutionUseCase,
  GetEducationalInstitutionByIdUseCase,
  UpdateEducationalInstitutionUseCase,
  DeleteEducationalInstitutionUseCase,
} from '../../application';
import { validateRoleMiddleware } from '../middleware';

const router = Router();

const educationalInstitutionRepository = new EducationalInstitutionRepository();

const createEducationalInstitutionUseCase =
  new CreateEducationalInstitutionUseCase(educationalInstitutionRepository);
const getAllEducationalInstitutionsUseCase =
  new GetAllEducationalInstitutionUseCase(educationalInstitutionRepository);
const getEducationalInstitutionByIdUseCase =
  new GetEducationalInstitutionByIdUseCase(educationalInstitutionRepository);
const updateEducationalInstitutionUseCase =
  new UpdateEducationalInstitutionUseCase(educationalInstitutionRepository);
const deleteEducationalInstitutionUseCase =
  new DeleteEducationalInstitutionUseCase(educationalInstitutionRepository);

const educationalInstitutionController = new EducationalInstitutionController(
  createEducationalInstitutionUseCase,
  getAllEducationalInstitutionsUseCase,
  getEducationalInstitutionByIdUseCase,
  updateEducationalInstitutionUseCase,
  deleteEducationalInstitutionUseCase,
);

// Defining routes with middleware validation and assigning controller methods
router.get(
  '/',
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  educationalInstitutionController.getAll,
);
router.get(
  '/:id',
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'INFOMANAGER']),
  educationalInstitutionController.getById,
);
router.post(
  '/',
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  educationalInstitutionController.create,
);
router.patch(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  educationalInstitutionController.update,
);
router.delete(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  educationalInstitutionController.delete,
);

export default router;
