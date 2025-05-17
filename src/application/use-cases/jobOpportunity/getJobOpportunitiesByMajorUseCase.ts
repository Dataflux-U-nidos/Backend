// 4. Versión mejorada del Use Case (necesitarás también el MajorRepository):

import { IJobOpportunityRepository, JobOpportunity } from '../../../domain';
import { IMajorRepository } from '../../../domain'; // Asumiendo que tienes este interface

export class GetJobOpportunitiesByMajorUseCase {
  constructor(
    private readonly jobOpportunityRepository: IJobOpportunityRepository,
    private readonly majorRepository: IMajorRepository, // Agregar este dependency
  ) {}

  async execute(majorId: string): Promise<JobOpportunity[]> {
    try {
      // Buscar la carrera por ID
      const major = await this.majorRepository.findById(majorId);

      if (!major) {
        throw new Error(`Major with ID ${majorId} not found`);
      }

      // Si la carrera no tiene job opportunities asociadas, retornar array vacío
      if (!major.jobOpportunityIds || major.jobOpportunityIds.length === 0) {
        return [];
      }

      // Buscar todas las job opportunities por sus IDs
      const jobOpportunities: JobOpportunity[] = [];

      for (const jobId of major.jobOpportunityIds) {
        try {
          const jobOpportunity =
            await this.jobOpportunityRepository.findById(jobId);
          if (jobOpportunity) {
            jobOpportunities.push(jobOpportunity);
          }
        } catch (error) {
          // Log del error pero continúa con los otros jobs
          console.warn(`Job opportunity with ID ${jobId} not found:`, error);
        }
      }

      return jobOpportunities;
    } catch (error) {
      throw new Error(`Error obtaining job opportunities by major: ${error}`);
    }
  }
}
