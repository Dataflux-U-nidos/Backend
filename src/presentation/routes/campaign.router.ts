import { Router } from 'express';
import { CampaignController } from '../controllers/campaign.controller';
import { CampaignRepository } from '../../infrastructure/database/repositories/campaign.repository.impl';
import {
  CreateCampaignUseCase,
  GetAllCampaignsUseCase,
  GetCampaignByIdUseCase,
  UpdateCampaignUseCase,
  DeleteCampaignUseCase,
  GetCampaignsByUserUseCase, // ← importar
} from '../../application';
import { validateRoleMiddleware } from '../middleware';

const router = Router();
const repo = new CampaignRepository();

const createUC = new CreateCampaignUseCase(repo);
const getAllUC = new GetAllCampaignsUseCase(repo);
const getByIdUC = new GetCampaignByIdUseCase(repo);
const updateUC = new UpdateCampaignUseCase(repo);
const deleteUC = new DeleteCampaignUseCase(repo);
const getByUserUC = new GetCampaignsByUserUseCase(repo); // ← instanciar

const ctrl = new CampaignController(
  createUC,
  getAllUC,
  getByIdUC,
  updateUC,
  deleteUC,
  getByUserUC, // ← pasar al controlador
);

router.get(
  '/',
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'MARKETING']),
  ctrl.getAll,
);
router.get(
  '/:id',
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'MARKETING']),
  ctrl.getById,
);
router.get(
  '/user/:userId',
  validateRoleMiddleware(['MARKETING']),
  ctrl.getByUser,
); // ← nueva ruta
router.post('/', validateRoleMiddleware(['ADMIN', 'MARKETING']), ctrl.create);
router.patch(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'MARKETING']),
  ctrl.update,
);
router.delete(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'MARKETING']),
  ctrl.delete,
);

export default router;
