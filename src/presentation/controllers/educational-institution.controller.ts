import { Request, Response } from "express";
import { validateSchema } from "../../shared/utils/typebox-validator";
import { EducationalInstitutionRepository } from "../../infrastructure/database/repositories/educational-institution.repository";
import { CreateEducationalInstitutionUseCase } from "../../application/use-cases/educational-institution/create-educational-institution.use-case";
import { CreateEducationalInstitutionSchema, UpdateEducationalInstitutionSchema } from "../../application/dtos/educational_institution.dto";

const educationalInstitutionRepository = new EducationalInstitutionRepository();

export class EducationalInstitutionController {

  public static async getAll(req: Request, res: Response) {
    try {
      const educationalInstitutions =
        await educationalInstitutionRepository.findAll();
      return res.json(200).json(educationalInstitutions);
    } catch (error) {
      return res.status(500).json({ message: "Error to obtain educational institutions" });
    }
  }

  public static async create (req: Request, res: Response) {
    const{valid, errors} = validateSchema(CreateEducationalInstitutionSchema, req.body);
    if(!valid){
        return res.status(400).json({errors});
    }
    try {
        const useCase = new CreateEducationalInstitutionUseCase(educationalInstitutionRepository);
        const newEducationalInstitution = await useCase.execute(req.body);
        return res.status(201).json(newEducationalInstitution);
    } catch (error) {
        return res.status(500).json({message: "Error to create educational institution"});
    }
  }

  public static async update(req: Request, res: Response) {
    const { valid, errors } = validateSchema(UpdateEducationalInstitutionSchema,req.body);
    if (!valid) {
      return res.status(400).json({ errors });
    }

    try {
      const { _id } = req.params;
      const educationalInstitutionUpdated = await educationalInstitutionRepository.update(_id, req.body);
      if (!educationalInstitutionUpdated) {
        return res.status(404).json({ message: "Educational institution not found" });
      }
      return res.status(200).json(educationalInstitutionUpdated);
    } catch (error) {
      return res.status(500).json({ message: "Error to update educational institution" });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
        const { _id } = req.params;
        const isDeleted = await educationalInstitutionRepository.delete(_id);
        if (!isDeleted) {
            return res.status(404).json({ message: "Educational institution not found" });
        }
        return res.status(200).json({message: "Educational institution deleted"});
    } catch (error) {
        return res.status(500).json({ message: "Error to delete educational institution" });
    }
  }

}
