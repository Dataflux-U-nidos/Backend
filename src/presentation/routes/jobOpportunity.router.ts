import { Router } from 'express';
import {
  JobOpportunityController,
  validateRoleMiddleware,
} from '../../presentation';
import { JobOpportunityRepository } from '../../infrastructure/database/repositories';
import {
  CreateJobOpportunityUseCase,
  DeleteJobOpportunityUseCase,
  GetAllJobOpportunityUseCase,
  GetJobOpportunityByIdUseCase,
  UpdateJobOpportunityUseCase,
} from '../../application';

const router = Router();

const jobOpportunityRepository = new JobOpportunityRepository();

const createJobOpportunityUseCase = new CreateJobOpportunityUseCase(
  jobOpportunityRepository,
);
const getAllJobOpportunityUseCase = new GetAllJobOpportunityUseCase(
  jobOpportunityRepository,
);
const getJobOpportunityByIdUseCase = new GetJobOpportunityByIdUseCase(
  jobOpportunityRepository,
);
const updateJobOpportunityUseCase = new UpdateJobOpportunityUseCase(
  jobOpportunityRepository,
);
const deleteJobOpportunityUseCase = new DeleteJobOpportunityUseCase(
  jobOpportunityRepository,
);

const jobOpportunityController = new JobOpportunityController(
  createJobOpportunityUseCase,
  getAllJobOpportunityUseCase,
  getJobOpportunityByIdUseCase,
  updateJobOpportunityUseCase,
  deleteJobOpportunityUseCase,
);

// Defining routes with middleware validation and assigning controller methods
router.get(
  '/',
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  jobOpportunityController.getAll,
);
router.get(
  '/:id',
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  jobOpportunityController.getById,
);
router.post(
  '/',
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  jobOpportunityController.create,
);
router.patch(
  '/:id',
  validateRoleMiddleware(['ADMIN']),
  jobOpportunityController.update,
);
router.delete(
  '/:id',
  validateRoleMiddleware(['ADMIN']),
  jobOpportunityController.delete,
);

export default router;
