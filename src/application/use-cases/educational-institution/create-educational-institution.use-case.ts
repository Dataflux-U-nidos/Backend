import { EducationalInstitutionRepository } from "../../../domain/repositories/educational-institution.repository";
import { EducationalInstitution } from "../../../domain/entities/educational-institution.entity";

export class CreateEducationalInstitutionUseCase {
    constructor(private educationalInstitutionRepository: EducationalInstitutionRepository) {}

    public async execute(data: Omit<EducationalInstitution, '_id'>): Promise<EducationalInstitution> {


        
        return this.educationalInstitutionRepository.create(data);
    }
}