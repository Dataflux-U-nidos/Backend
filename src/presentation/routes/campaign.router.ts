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
import { logRequest } from '../middleware/logRequest';
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
  logRequest('/campaign', 'GET', 'GetAllCampaigns'),
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'MARKETING']),
  ctrl.getAll,
);

router.get(
  '/total',
  logRequest('/campaign/total', 'GET', 'GetTotalInvestment'),
  validateRoleMiddleware(['FINANCES', 'ADMIN']),
  ctrl.getTotalInvestment,
);

router.get(
  '/user/:userId',
  logRequest('/campaign/user/:userId', 'GET', 'GetCampaignsByUser'),
  validateRoleMiddleware(['MARKETING', 'ADMIN']),
  ctrl.getByUser,
);

router.get(
  '/:id',
  logRequest('/campaign/:id', 'GET', 'GetCampaignById'),
  validateRoleMiddleware(['STUDENT', 'ADMIN', 'MARKETING']),
  ctrl.getById,
);

router.post(
  '/',
  logRequest('/campaign', 'POST', 'CreateCampaign'),
  validateRoleMiddleware(['ADMIN', 'MARKETING']),
  ctrl.create,
);

router.patch(
  '/:id',
  logRequest('/campaign/:id', 'PATCH', 'UpdateCampaign'),
  validateRoleMiddleware(['ADMIN', 'MARKETING']),
  ctrl.update,
);

router.delete(
  '/:id',
  logRequest('/campaign/:id', 'DELETE', 'DeleteCampaign'),
  validateRoleMiddleware(['ADMIN', 'MARKETING']),
  ctrl.delete,
);

export default router;
