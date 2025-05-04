import { Request, Response, NextFunction } from 'express';
import {
  CreateSubscriptionPlanUseCase,
  GetAllSubscriptionPlansUseCase,
  GetSubscriptionPlanByIdUseCase,
  UpdateSubscriptionPlanUseCase,
  DeleteSubscriptionPlanUseCase,
} from '../../application';
import {
  CreateSubscriptionPlanDto,
  UpdateSubscriptionPlanDto,
} from '../../application/dtos/subscriptionPlan.dto';

export class SubscriptionPlanController {
  constructor(
    private readonly createUC: CreateSubscriptionPlanUseCase,
    private readonly getAllUC: GetAllSubscriptionPlansUseCase,
    private readonly getByIdUC: GetSubscriptionPlanByIdUseCase,
    private readonly updateUC: UpdateSubscriptionPlanUseCase,
    private readonly deleteUC: DeleteSubscriptionPlanUseCase,
  ) {}

  public getAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.getAllUC.execute();
      res.status(200).json(items);
    } catch (e) {
      next(e);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.getByIdUC.execute(req.params.id);
      if (!item) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.status(200).json(item);
    } catch (e) {
      next(e);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as CreateSubscriptionPlanDto;
      const newPlan = await this.createUC.execute(dto);
      res.status(201).json(newPlan);
    } catch (e) {
      next(e);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as UpdateSubscriptionPlanDto;
      const updated = await this.updateUC.execute(req.params.id, dto);
      if (!updated) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (e) {
      next(e);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ok = await this.deleteUC.execute(req.params.id);
      if (!ok) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.status(200).json({ message: 'Deleted' });
    } catch (e) {
      next(e);
    }
  };
}
