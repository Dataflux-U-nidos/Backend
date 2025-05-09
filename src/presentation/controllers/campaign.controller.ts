// src/presentation/controllers/campaign.controller.ts
import { Request, Response, NextFunction } from 'express';
import {
  CreateCampaignUseCase,
  GetAllCampaignsUseCase,
  GetCampaignByIdUseCase,
  GetCampaignsByUserUseCase,
  UpdateCampaignUseCase,
  DeleteCampaignUseCase,
  GetTotalInvestmentUseCase,
} from '../../application';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
} from '../../application/dtos/campaign.dto';
import { UserType } from '../../domain/entities/user.entity';

interface RequestWithUser extends Request {
  user?: { id: string; userType: UserType };
}

export class CampaignController {
  constructor(
    private readonly createUC: CreateCampaignUseCase,
    private readonly getAllUC: GetAllCampaignsUseCase,
    private readonly getByIdUC: GetCampaignByIdUseCase,
    private readonly updateUC: UpdateCampaignUseCase,
    private readonly deleteUC: DeleteCampaignUseCase,
    private readonly getByUserUC: GetCampaignsByUserUseCase,
    private readonly getTotalInvestmentUC: GetTotalInvestmentUseCase,
  ) {}

  public getAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.getAllUC.execute();
      res.status(200).json(items);
    } catch (e) {
      next(e);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const item = await this.getByIdUC.execute(req.params.id);
      if (!item) {
        res.status(404).json({ message: 'Not found' });
        return; // aquí termina el handler, pero no devolvemos el res
      }
      res.status(200).json(item);
    } catch (e) {
      next(e);
    }
  };

  public getByUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const items = await this.getByUserUC.execute(req.params.userId);
      res.status(200).json(items);
    } catch (e) {
      next(e);
    }
  };

  public create = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const dto = req.body as CreateCampaignDto;
      const newCampaign = await this.createUC.execute(dto, userId);
      res.status(201).json(newCampaign);
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dto = req.body as UpdateCampaignDto;
      const item = await this.updateUC.execute(req.params.id, dto);
      if (!item) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      // NO return aquí
      res.status(200).json(item);
    } catch (e) {
      next(e);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const ok = await this.deleteUC.execute(req.params.id);
      if (!ok) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      // Tampoco aquí
      res.status(200).json({ message: 'Deleted' });
    } catch (e) {
      next(e);
    }
  };

  public getTotalInvestment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const totals = await this.getTotalInvestmentUC.execute();
      res.status(200).json(totals);
    } catch (e) {
      next(e);
    }
  };
}
