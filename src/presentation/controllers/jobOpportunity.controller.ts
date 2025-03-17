//.
import { Request, Response, NextFunction } from "express";
import { CreateJobOpportunityUseCase, DeleteJobOpportunityUseCase, GetAllJobOpportunityUseCase,GetJobOpportunityByIdUseCase, UpdateJobOpportunityUseCase } from '../../application';

export class JobOpportunityController {
    constructor(
      private readonly createJobOpportunityUseCase: CreateJobOpportunityUseCase,
      private readonly getAllJobOpportunityUseCase: GetAllJobOpportunityUseCase,
      private readonly getJobOpportunityByIdUseCase: GetJobOpportunityByIdUseCase,
      private readonly updateJobOpportunityUseCase: UpdateJobOpportunityUseCase,
      private readonly deleteJobOpportunityUseCase: DeleteJobOpportunityUseCase
    ) {}
  
    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        console.log(typeof res.status);
        const jobOpportunity = await this.getAllJobOpportunityUseCase.execute();
        res.status(200).json(jobOpportunity);
      } catch (error) {
        next(error);
      }
    };
  
    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const jobOpportunity = await this.getJobOpportunityByIdUseCase.execute(id);
        if (!jobOpportunity) {
          res.status(404).json({ message: 'Oportunidad de trabajo no encontrada' });
        } else {
          res.status(200).json(jobOpportunity);
        }
      } catch (error) {
        next(error);
      }
    };
  
    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const newJobOpportunity = await this.createJobOpportunityUseCase.execute(req.body);
        res.status(201).json(newJobOpportunity);
      } catch (error) {
        next(error);
      }
    };
  
    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const updatedJobOpportunity = await this.updateJobOpportunityUseCase.execute(id, req.body);
        if (!updatedJobOpportunity) {
          res.status(404).json({ message: 'Oportunidad de trabajo no encontrada' });
        } else {
          res.status(200).json(updatedJobOpportunity);
        }
      } catch (error) {
        next(error);
      }
    };
  
    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const wasDeleted = await this.deleteJobOpportunityUseCase.execute(id);
        if (!wasDeleted) {
          res.status(404).json({ message: 'Oportunidad de trabajo no encontrada' });
        } else {
          res.status(200).json({ message: 'Oportunidad de trabajo eliminada correctamente' });
        }
      } catch (error) {
        next(error);
      }
    };
  }