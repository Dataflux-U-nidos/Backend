import { NextFunction, Request, Response } from "express";
import { EducationalInstitutionRepository } from "../../infrastructure/database/repositories/educational-institution.repository.Impl";
import { CreateEducationalInstitutionUseCase } from "../../application/use-cases/educational-institution/create-educational-institution.use-case";
import { UpdateEducationalInstitutionUseCase } from "../../application/use-cases/educational-institution/update-educational-institution.use-case";
import { GetEducationalInstitutionByIdUseCase } from "../../application/use-cases/educational-institution/get-educational-institution-by-id.use-case";
import { DeleteEducationalInstitutionUseCase } from "../../application/use-cases/educational-institution/delete-educational-institution.use-cases";
import { GetAllEducationalInstitutionUseCase } from "../../application/use-cases/educational-institution/get-all-educational-institution.use-case";


const educationalInstitutionRepository = new EducationalInstitutionRepository();

export class EducationalInstitutionController {
  constructor(
    private readonly createEducationalInstitutionUseCase: CreateEducationalInstitutionUseCase,
    private readonly getAllEducationalInstitutionsUseCase: GetAllEducationalInstitutionUseCase,
    private readonly getEducationalInstitutionByIdUseCase: GetEducationalInstitutionByIdUseCase,
    private readonly updateEducationalInstitutionUseCase: UpdateEducationalInstitutionUseCase,
    private readonly deleteEducationalInstitutionUseCase: DeleteEducationalInstitutionUseCase
  ) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const educationInstitution = await this.getAllEducationalInstitutionsUseCase.execute();
      res.status(200).json(educationInstitution);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const educationalInstitution = await this.getEducationalInstitutionByIdUseCase.execute(id);
        if (!educationalInstitution) {
          res.status(404).json({ message: 'Institución educativa no encontrada' });
        } else {
          res.status(200).json(educationalInstitution);
        }
      } catch (error) {
        next(error);
      }
    };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const newEducationalInstitution = await this.createEducationalInstitutionUseCase.execute(req.body);
        res.status(201).json(newEducationalInstitution);
      } catch (error) {
        next(error);
      }
    };

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const updatedEducationalInstitution = await this.updateEducationalInstitutionUseCase.execute(id, req.body);
        if (!updatedEducationalInstitution) {
          res.status(404).json({ message: 'Institución educativa no encontrada' });
        } else {
          res.status(200).json(updatedEducationalInstitution);
        }
      } catch (error) {
        next(error);
      }
    };

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const wasDeleted = await this.deleteEducationalInstitutionUseCase.execute(id);
        if (!wasDeleted) {
          res.status(404).json({ message: 'Institución educativa no encontrada' });
        } else {
          res.status(200).json({ message: 'Institución educativa eliminada correctamente' });
        }
      } catch (error) {
        next(error);
      }
    };
}
