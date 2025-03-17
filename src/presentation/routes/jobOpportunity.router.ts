import { Router } from 'express';
import { JobOpportunityController } from '../../presentation';
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

router.get('/', jobOpportunityController.getAll);
router.get('/:id', jobOpportunityController.getById);
router.post('/', jobOpportunityController.create);
router.patch('/:id', jobOpportunityController.update);
router.delete('/:id', jobOpportunityController.delete);

export default router;
