import { Router } from 'express';
import { CampaignController } from '../controllers/campaign.controller';
import { CampaignRepository } from '../../infrastructure/database/repositories/campaign.repository.impl';
import {
  CreateCampaignUseCase,
  GetAllCampaignsUseCase,
  GetCampaignByIdUseCase,
  UpdateCampaignUseCase,
  DeleteCampaignUseCase,
  GetCampaignsByUserUseCase,
  GetTotalInvestmentUseCase,
} from '../../application';
import { validateRoleMiddleware } from '../middleware';

const router = Router();
const repo = new CampaignRepository();

const createUC = new CreateCampaignUseCase(repo);
const getAllUC = new GetAllCampaignsUseCase(repo);
const getByIdUC = new GetCampaignByIdUseCase(repo);
const updateUC = new UpdateCampaignUseCase(repo);
const deleteUC = new DeleteCampaignUseCase(repo);
const getByUserUC = new GetCampaignsByUserUseCase(repo);
const getTotalInvestmentUC = new GetTotalInvestmentUseCase(repo);

const ctrl = new CampaignController(
  createUC,
  getAllUC,
  getByIdUC,
  updateUC,
  deleteUC,
  getByUserUC,
  getTotalInvestmentUC,
);

router.get(
  '/',
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'MARKETING']),
  ctrl.getAll,
);
router.get(
  '/total',
  validateRoleMiddleware(['FINANCES', 'ADMIN']),
  ctrl.getTotalInvestment,
);
router.get(
  '/user/:userId',
  validateRoleMiddleware(['MARKETING', 'ADMIN']),
  ctrl.getByUser,
);
router.get(
  '/:id',
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'MARKETING']),
  ctrl.getById,
);
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
