import { Router } from "express";
import { JobOpportunityController } from '../../presentation';
import JobOpportunityRepository  from '../../infrastructure/database/repositories';
import { CreateJobOpportunityUseCase, DeleteJobOpportunityUseCase, GetAllJobOpportunityUseCase, GetJobOpportunityByIdUseCase, UpdateJobOpportunityUseCase } from '../../application';


const router = Router();

const jobOpportunityRepository = new JobOpportunityRepository();

const createJobOpportunityUseCase = new CreateJobOpportunityUseCase(JobOpportunityRepository);
const getAllJobOpportunityUseCase = new GetAllJobOpportunityUseCase(JobOpportunityRepository);
const getJobOpportunityByIdUseCase = new GetJobOpportunityByIdUseCase(JobOpportunityRepository);
const updateJobOpportunityUseCase = new UpdateJobOpportunityUseCase(JobOpportunityRepository);
const deleteJobOpportunityUseCase = new DeleteJobOpportunityUseCase(JobOpportunityRepository);

const jobOpportunityController = new JobOpportunityController(
  createJobOpportunityUseCase,
  getAllJobOpportunityUseCase,
  getJobOpportunityByIdUseCase,
  updateJobOpportunityUseCase,
  deleteJobOpportunityUseCase
);

router.get('/', jobOpportunityController.getAll);
router.get('/:id', jobOpportunityController.getById);
router.post('/', jobOpportunityController.create);
router.patch('/:id', jobOpportunityController.update);
router.delete('/:id', jobOpportunityController.delete);

export default router;