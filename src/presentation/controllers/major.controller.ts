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
      // A partir del ID del usuario, se obtiene la institución
      // y se asigna a la carrera que se va a crear
      const userId = req.user?.id;
      // 2) Recuperamos al usuario para obtener su institutionId
      if (!userId) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      console.log('userId', userId);

      const user = await this.getUserByIdUseCase.execute(userId);

      const dto: Major = {
        ...req.body,
        institutionId: user?.universityId, // aquí inyectamos la institución del user
      };

      const newMajor = await this.createMajorUseCase.execute(dto);
      res.status(201).json(newMajor);
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
}
