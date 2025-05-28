import { Request, Response, NextFunction } from 'express';
import { Major } from '../../domain/';
import {
  CreateMajorUseCase,
  GetAllMajorsUseCase,
  GetMajorByIdUseCase,
  UpdateMajorUseCase,
  DeleteMajorUseCase,
  GetMajorsByInstitutionUseCase,
  GetUserByIdUseCase,
  AddJobOpportunityToMajorUseCase,
} from '../../application';
import { UserType } from '../../domain/entities/user.entity';

interface RequestWithUser extends Request {
  user?: { id: string; userType: UserType };
}

export class MajorController {
  constructor(
    private readonly createMajorUseCase: CreateMajorUseCase,
    private readonly getAllMajorsUseCase: GetAllMajorsUseCase,
    private readonly getMajorByIdUseCase: GetMajorByIdUseCase,
    private readonly updateMajorUseCase: UpdateMajorUseCase,
    private readonly deleteMajorUseCase: DeleteMajorUseCase,
    private readonly getMajorsByInstitutionUseCase: GetMajorsByInstitutionUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly addJobOpportunityUseCase: AddJobOpportunityToMajorUseCase,
  ) {}

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const majors = await this.getAllMajorsUseCase.execute();
      res.status(200).json(majors);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const major = await this.getMajorByIdUseCase.execute(id);
      if (!major) {
        res.status(404).json({ message: 'Carrera no encontrada' });
      } else {
        res.status(200).json(major);
      }
    } catch (error) {
      next(error);
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

      // 1) Recuperamos al usuario para extraer su universityId
      const user = await this.getUserByIdUseCase.execute(userId);
      if (user) {
        const dto: Omit<Major, 'id'> & { createdBy: string } = {
          ...(req.body as Omit<Major, 'id'>),
          institutionId: user.universityId ?? '',
          createdBy: userId,
        };

        const newMajor = await this.createMajorUseCase.execute(dto);
        res.status(201).json(newMajor);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
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
      const { id } = req.params;
      const updatedMajor = await this.updateMajorUseCase.execute(id, req.body);
      if (!updatedMajor) {
        res.status(404).json({ message: 'Carrera no encontrada' });
      } else {
        res.status(200).json(updatedMajor);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deleteMajorUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'Carrera no encontrada' });
      } else {
        res.status(200).json({ message: 'Carrera eliminada correctamente' });
      }
    } catch (error) {
      next(error);
    }
  };

  public getByInstitution = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { institutionId } = req.params;
      const majors =
        await this.getMajorsByInstitutionUseCase.execute(institutionId);
      res.status(200).json(majors);
    } catch (err) {
      next(err);
    }
  };

  public addJobOpportunity = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params; // majorId
      const { jobOpportunityId } = req.body;
      const updated = await this.addJobOpportunityUseCase.execute(
        id,
        jobOpportunityId,
      );
      if (!updated) {
        res.status(404).json({ message: 'Major not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  };
}
