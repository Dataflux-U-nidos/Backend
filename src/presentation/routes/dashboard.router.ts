// src/presentation/routes/dashboard.router.ts

import { Router } from 'express';
import { DashboardController } from '../../presentation';
import { logRequest } from '../middleware/logRequest';

const router = Router();
const dashboardController = new DashboardController();

router.get(
  '/universidades',
  logRequest('/dashboard/universidades', 'GET', 'GetUniversidades'),
  dashboardController.getUniversidades,
);

router.get(
  '/carreras',
  logRequest('/dashboard/carreras', 'GET', 'GetCarreras'),
  dashboardController.getCarreras,
);

router.get(
  '/universidades-buscadas',
  logRequest(
    '/dashboard/universidades-buscadas',
    'GET',
    'GetUniversidadesBuscadas',
  ),
  dashboardController.getUniversidadesBuscadas,
);

router.get(
  '/users',
  logRequest('/dashboard/users', 'GET', 'GetUsers'),
  dashboardController.getUsers,
);

export default router;
