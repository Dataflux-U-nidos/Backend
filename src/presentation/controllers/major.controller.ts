import { Request, Response, NextFunction } from 'express';
import { MajorRepository } from '../../infrastructure';
import { CreateMajorUseCase,GetAllMajorsUseCase, GetMajorByIdUseCase, UpdateMajorUseCase, DeleteMajorUseCase } from '../../application';

const majorRepository = new MajorRepository();

export class MajorController {
  public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = new GetAllMajorsUseCase(majorRepository);
      const majors = await useCase.execute();
      res.status(200).json(majors);
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new GetMajorByIdUseCase(majorRepository);
      const major = await useCase.execute(id);
      if (!major) {
        res.status(404).json({ message: 'Carrera no encontrada' });
      } else {
        res.status(200).json(major);
      }
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = new CreateMajorUseCase(majorRepository);
      const newMajor = await useCase.execute(req.body);
      res.status(201).json(newMajor);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new UpdateMajorUseCase(majorRepository);
      const updatedMajor = await useCase.execute(id, req.body);
      if (!updatedMajor) {
        res.status(404).json({ message: 'Carrera no encontrada' });
      } else {
        res.status(200).json(updatedMajor);
      }
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new DeleteMajorUseCase(majorRepository);
      const wasDeleted = await useCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'Carrera no encontrada' });
      } else {
        res.status(200).json({ message: 'Carrera eliminada correctamente' });
      }
    } catch (error) {
      next(error);
    }
  }
}
