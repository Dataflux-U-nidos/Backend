import { Request, Response, NextFunction } from 'express';
import { CreateMajorUseCase,GetAllMajorsUseCase, GetMajorByIdUseCase, UpdateMajorUseCase, DeleteMajorUseCase } from '../../application';

export class MajorController {
  constructor(
    private readonly createMajorUseCase: CreateMajorUseCase,
    private readonly getAllMajorsUseCase: GetAllMajorsUseCase,
    private readonly getMajorByIdUseCase: GetMajorByIdUseCase,
    private readonly updateMajorUseCase: UpdateMajorUseCase,
    private readonly deleteMajorUseCase: DeleteMajorUseCase
  ) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const majors = await this.getAllMajorsUseCase.execute();
      res.status(200).json(majors);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newMajor = await this.createMajorUseCase.execute(req.body);
      res.status(201).json(newMajor);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
}