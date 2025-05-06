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
// Create subscription plan (ADMIN, MARKETING)
router.post('/', validateRoleMiddleware(['ADMIN']), planController.create);

// —————— RUTAS DE LECTURA ESTÁTICAS ——————
// List all plans (any authenticated role)
router.get('/', planController.getAll);

router.get(
  '/revenue',
  validateRoleMiddleware(['FINANCES']),
  planController.getTotalRevenueByPeriod,
);

// —————— RUTAS DINÁMICAS (PARÁMETRO :id) ——————
// Get plan by ID
router.get(
  '/revenue/:type',
  validateRoleMiddleware(['FINANCES']),
  planController.getRevenueByPlanType,
);

router.get(
  '/:id',
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

// Update plan by ID (ADMIN, MARKETING)
router.patch(
  '/:id',
  validateRoleMiddleware(['ADMIN', 'FINANCES']),
  planController.update,
);

// Delete plan by ID (ADMIN only)
router.delete('/:id', validateRoleMiddleware(['ADMIN']), planController.delete);

export default router;
