// 5. Actualizar el router con el orden correcto de rutas:

import { Router } from 'express';
import {
  JobOpportunityController,
  validateRoleMiddleware,
} from '../../presentation';
import { JobOpportunityRepository } from '../../infrastructure/database/repositories';
import { MajorRepository } from '../../infrastructure/database/repositories'; // Import necesario
import {
  CreateJobOpportunityUseCase,
  DeleteJobOpportunityUseCase,
  GetAllJobOpportunityUseCase,
  GetJobOpportunityByIdUseCase,
  UpdateJobOpportunityUseCase,
  GetJobOpportunitiesByMajorUseCase,
} from '../../application';
import { logRequest } from '../middleware/logRequest';

const router = Router();

const jobOpportunityRepository = new JobOpportunityRepository();
const majorRepository = new MajorRepository(); // Nueva instancia

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
const getJobOpportunitiesByMajorUseCase = new GetJobOpportunitiesByMajorUseCase(
  jobOpportunityRepository,
  majorRepository, // Pasar ambos repositories
);

const jobOpportunityController = new JobOpportunityController(
  createJobOpportunityUseCase,
  getAllJobOpportunityUseCase,
  getJobOpportunityByIdUseCase,
  updateJobOpportunityUseCase,
  deleteJobOpportunityUseCase,
  getJobOpportunitiesByMajorUseCase,
);

router.get(
  '/',
  logRequest('/jobOpportunity', 'GET', 'GetAllJobOpportunities'),
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'INFOMANAGER']),
  jobOpportunityController.getAll,
);

// Esta ruta debe ir ANTES que /:id
router.get(
  '/major/:majorId',
  logRequest(
    '/jobOpportunity/major/:majorId',
    'GET',
    'GetJobOpportunitiesByMajor',
  ),
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  jobOpportunityController.getByMajor,
);

// Esta ruta va después de las rutas específicas
router.get(
  '/:id',
  logRequest('/jobOpportunity/:id', 'GET', 'GetJobOpportunityById'),
  validateRoleMiddleware(['STUDENT', 'ADMIN']),
  jobOpportunityController.getById,
);

router.post(
  '/',
  logRequest('/jobOpportunity', 'POST', 'CreateJobOpportunity'),
  validateRoleMiddleware(['ADMIN', 'INFOMANAGER']),
  jobOpportunityController.create,
);
router.patch(
  '/:id',
  logRequest('/jobOpportunity/:id', 'PATCH', 'UpdateJobOpportunity'),
  validateRoleMiddleware(['ADMIN']),
  jobOpportunityController.update,
);
router.delete(
  '/:id',
  logRequest('/jobOpportunity/:id', 'DELETE', 'DeleteJobOpportunity'),
  validateRoleMiddleware(['ADMIN']),
  jobOpportunityController.delete,
);

export default router;
