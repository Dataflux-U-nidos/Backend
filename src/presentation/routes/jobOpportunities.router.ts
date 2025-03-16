import { Router } from "express";
import { CreateJobOpportunitiesUseCase } from "../../application/use-cases/jobOpportunities/create-jobOpportunities.use-case";
import { DeleteJobOpportunitiesUseCase } from "../../application/use-cases/jobOpportunities/delete-jobOpportunities.use-case";
import { GetAllJobOpportunitiesUseCase } from "../../application/use-cases/jobOpportunities/get-all-jobOpportunities.use-case";
import { GetJobOpportunitiesByIdUseCase } from "../../application/use-cases/jobOpportunities/get-jobOpportunities-by-id.use-case";
import { UpdateJobOpportunitiesUseCase } from "../../application/use-cases/jobOpportunities/update-jobOpportunities.use-case";
import { JobOpportunitiesRepository } from "../../infrastructure/database/repositories/jobOpportunities.repository.impl";
import { JobOpportunitiesController } from "../controllers/jobOpportunities.controller";

const router = Router();

const jobOpportunitiesRepository = new JobOpportunitiesRepository();

const createJobOpportunitiesUseCase = new CreateJobOpportunitiesUseCase(jobOpportunitiesRepository);
const getAllJobOpportunitiesUseCase = new GetAllJobOpportunitiesUseCase(jobOpportunitiesRepository);
const getJobOpportunitiesByIdUseCase = new GetJobOpportunitiesByIdUseCase(jobOpportunitiesRepository);
const updateJobOpportunitiesUseCase = new UpdateJobOpportunitiesUseCase(jobOpportunitiesRepository);
const deleteJobOpportunitiesUseCase = new DeleteJobOpportunitiesUseCase(jobOpportunitiesRepository);

const jobOpportunitiesController = new JobOpportunitiesController(
  createJobOpportunitiesUseCase,
  getAllJobOpportunitiesUseCase,
  getJobOpportunitiesByIdUseCase,
  updateJobOpportunitiesUseCase,
  deleteJobOpportunitiesUseCase
);

router.get('/', jobOpportunitiesController.getAll);
router.get('/:id', jobOpportunitiesController.getById);
router.post('/', jobOpportunitiesController.create);
router.patch('/:id', jobOpportunitiesController.update);
router.delete('/:id', jobOpportunitiesController.delete);

export default router;