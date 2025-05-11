// src/application/use-cases/user/get-recommendations.use-case.ts
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { IMajorRepository } from '../../../domain/repositories/major.repository';
import { Major } from '../../../domain/entities/major.entity';

export class GetRecommendationsUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly majorRepo: IMajorRepository,
  ) {}

  async execute(userId: string): Promise<Major[]> {
    // 1) Carga estudiante
    const student = await this.userRepo.findById(userId);
    console.log('student', student);
    if (!student) throw new Error('User not found');
    const userPrefs = student.preferences ?? [];
    const userZone = student.zone;
    if (!userZone) throw new Error('User zone is not defined');
    const userLocality = student.locality;
    if (!userLocality) throw new Error('User locality is not defined');

    // 2) Obtén todos los Majors como DTOs (con fechas como string)
    const majorsDto = await this.majorRepo.findAll(); // MajorResponseDto[]

    // 3) Mapea a entidades de dominio Major (con Date)
    const majors: Major[] = majorsDto.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      createdBy: m.createdBy,
      institutionId: m.institutionId,
      difficulty: m.difficulty,
      price: m.price,
      pensumLink: m.pensumLink,
      jobOpportunityIds: m.jobOpportunityIds,
      focus: m.focus,
      preferences: m.preferences,
      createdAt: new Date(m.createdAt),
      updatedAt: new Date(m.updatedAt),
    }));

    // 4) Prefetch de zonas/localidades de universidades
    const uniMap: Record<string, { zone: string; locality: string }> = {};
    await Promise.all(
      Array.from(new Set(majors.map((m) => m.institutionId))).map(
        async (instId) => {
          const u = await this.userRepo.findById(instId);
          if (u?.userType === 'UNIVERSITY' && u.zone && u.locality) {
            uniMap[instId] = { zone: u.zone, locality: u.locality };
          }
        },
      ),
    );

    // 5) Filtra y agrupa en tres niveles
    const group1: Major[] = [];
    const group2: Major[] = [];
    const group3: Major[] = [];

    for (const m of majors) {
      if (!m.preferences.some((p) => userPrefs.includes(p))) continue;
      const uni = uniMap[m.institutionId];
      if (!uni) continue;

      const sameZone = uni.zone === userZone;
      const sameLocality = uni.locality === userLocality;

      if (sameZone && sameLocality) {
        group1.push(m);
      } else if (sameZone) {
        group2.push(m);
      } else {
        group3.push(m);
      }
    }

    // 6) Devuelve ordenado
    return [...group1, ...group2, ...group3];
  }
}
