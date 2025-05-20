// src/presentation/routes/dashboard.router.ts

import { Router } from 'express';
import { DashboardController } from '../../presentation';

const router = Router();
const dashboardController = new DashboardController();

router.get('/universidades', dashboardController.getUniversidades);

router.get('/carreras', dashboardController.getCarreras);

router.get(
  '/universidades-buscadas',
  dashboardController.getUniversidadesBuscadas,
);

router.get('/users', dashboardController.getUsers);

export default router;
