// src/presentation/controllers/dashboard.controller.ts

import { Request, Response, NextFunction } from 'express';
import {
  dataUniversidades,
  dataCarreras,
  dataUniversidadesBuscadas,
  usersData,
} from '../../infrastructure/mocks/dashboardData';

export class DashboardController {
  // GET /api/dashboard/universidades
  public getUniversidades = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.status(200).json(dataUniversidades);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/dashboard/carreras
  public getCarreras = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.status(200).json(dataCarreras);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/dashboard/universidades-buscadas
  public getUniversidadesBuscadas = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.status(200).json(dataUniversidadesBuscadas);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/dashboard/users
  public getUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.status(200).json(usersData);
    } catch (error) {
      next(error);
    }
  };
}
