// src/presentation/routes/subscriptionPlan.router.ts
import { Router } from 'express';
import {
  SubscriptionPlanController,
  validateRoleMiddleware,
} from '../../presentation';
import { SubscriptionPlanRepository } from '../../infrastructure/database/repositories/subscriptionPlan.repository.impl';
import {
  CreateSubscriptionPlanUseCase,
  GetAllSubscriptionPlansUseCase,
  GetSubscriptionPlanByIdUseCase,
  UpdateSubscriptionPlanUseCase,
  DeleteSubscriptionPlanUseCase,
  GetRevenueByPlanTypeUseCase,
  GetTotalRevenueByPeriodUseCase,
} from '../../application';
import { logRequest } from '../middleware/logRequest';

const router = Router();

// —————— INSTANCIAS ——————
const repo = new SubscriptionPlanRepository();
const createPlanUC = new CreateSubscriptionPlanUseCase(repo);
const getAllPlansUC = new GetAllSubscriptionPlansUseCase(repo);
const getPlanByIdUC = new GetSubscriptionPlanByIdUseCase(repo);
const updatePlanUC = new UpdateSubscriptionPlanUseCase(repo);
const deletePlanUC = new DeleteSubscriptionPlanUseCase(repo);
const getRevenueByPlanTypeUC = new GetRevenueByPlanTypeUseCase(repo);
const getTotalRevenueByPeriodUC = new GetTotalRevenueByPeriodUseCase(repo);

const planController = new SubscriptionPlanController(
  createPlanUC,
  getAllPlansUC,
  getPlanByIdUC,
  updatePlanUC,
  deletePlanUC,
  getRevenueByPlanTypeUC,
  getTotalRevenueByPeriodUC,
);

// —————— RUTAS DE CREACIÓN ——————
router.post(
  '/',
  logRequest('/subscription-plan', 'POST', 'CreateSubscriptionPlan'),
  validateRoleMiddleware(['ADMIN']),
  planController.create,
);

// —————— RUTAS DE LECTURA ESTÁTICAS ——————
router.get(
  '/',
  logRequest('/subscription-plan', 'GET', 'GetAllSubscriptionPlans'),
  planController.getAll,
);

router.get(
  '/revenue',
  logRequest('/subscription-plan/revenue', 'GET', 'GetTotalRevenueByPeriod'),
  validateRoleMiddleware(['FINANCES']),
  planController.getTotalRevenueByPeriod,
);

// —————— RUTAS DINÁMICAS (PARÁMETRO :id) ——————
router.get(
  '/revenue/:type',
  logRequest('/subscription-plan/revenue/:type', 'GET', 'GetRevenueByPlanType'),
  validateRoleMiddleware(['FINANCES']),
  planController.getRevenueByPlanType,
);

router.get(
  '/:id',
  logRequest('/subscription-plan/:id', 'GET', 'GetSubscriptionPlanById'),
  validateRoleMiddleware([
    'ADMIN',
    'MARKETING',
    'FINANCES',
    'STUDENT',
    'VIEWER',
    'TUTOR',
    'UNIVERSITY',
  ]),
  planController.getById,
);

router.patch(
  '/:id',
  logRequest('/subscription-plan/:id', 'PATCH', 'UpdateSubscriptionPlan'),
  validateRoleMiddleware(['ADMIN', 'FINANCES']),
  planController.update,
);

router.delete(
  '/:id',
  logRequest('/subscription-plan/:id', 'DELETE', 'DeleteSubscriptionPlan'),
  validateRoleMiddleware(['ADMIN']),
  planController.delete,
);

export default router;
