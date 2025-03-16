import { Request, Response, NextFunction } from "express";
import { CreateJobOpportunitiesUseCase } from "../../application/use-cases/jobOpportunities/create-jobOpportunities.use-case";
import { DeleteJobOpportunitiesUseCase } from "../../application/use-cases/jobOpportunities/delete-jobOpportunities.use-case";
import { GetAllJobOpportunitiesUseCase } from "../../application/use-cases/jobOpportunities/get-all-jobOpportunities.use-case";
import { GetJobOpportunitiesByIdUseCase } from "../../application/use-cases/jobOpportunities/get-jobOpportunities-by-id.use-case";
import { UpdateJobOpportunitiesUseCase } from "../../application/use-cases/jobOpportunities/update-jobOpportunities.use-case";

export class JobOpportunitiesController {
    constructor(
      private readonly createJobOpportunitiesUseCase: CreateJobOpportunitiesUseCase,
      private readonly getAllJobOpportunitiesUseCase: GetAllJobOpportunitiesUseCase,
      private readonly getJobOpportunitiesByIdUseCase: GetJobOpportunitiesByIdUseCase,
      private readonly updateJobOpportunitiesUseCase: UpdateJobOpportunitiesUseCase,
      private readonly deleteJobOpportunitiesUseCase: DeleteJobOpportunitiesUseCase
    ) {}
  
    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        console.log(typeof res.status);
        const jobOpportunities = await this.getAllJobOpportunitiesUseCase.execute();
        res.status(200).json(jobOpportunities);
      } catch (error) {
        next(error);
      }
    };
  
    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const jobOpportunity = await this.getJobOpportunitiesByIdUseCase.execute(id);
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
        const newJobOpportunity = await this.createJobOpportunitiesUseCase.execute(req.body);
        res.status(201).json(newJobOpportunity);
      } catch (error) {
        next(error);
      }
    };
  
    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const updatedJobOpportunity = await this.updateJobOpportunitiesUseCase.execute(id, req.body);
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
        const wasDeleted = await this.deleteJobOpportunitiesUseCase.execute(id);
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