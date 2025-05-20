// src/application/use-cases/user/get-recommendations.use-case.ts
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { IMajorRepository } from '../../../domain/repositories/major.repository';
import { Major } from '../../../domain/entities/major.entity';

// Tipo para la respuesta enriquecida con información de universidad
interface RecommendationWithUniversityInfo {
  // Información del major (carrera)
  _id: string;
  name: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  price: number;
  focus: string;
  institutionId: string;
  pensumLink: string;
  jobOpportunityIds: string[];
  preferences: string[];
  createdAt: string;
  updatedAt: string;
  
  // Información completa de la universidad
  university: {
    id: string;
    name: string;
    email: string;
    address: string;
    zone: string;
    locality: string;
    price_range: 'LOW' | 'MEDIUM' | 'HIGH';
    aceptation_difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    description: string;
    link: string;
    events: Array<{
      name: string;
      description: string;
      date: string;
      location: string;
    }>;
  };
}

export class GetRecommendationsUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly majorRepo: IMajorRepository,
  ) {}

  async execute(userId: string): Promise<RecommendationWithUniversityInfo[]> {
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

    // 4) Prefetch de información COMPLETA de universidades
    const universityMap: Record<string, any> = {};
    await Promise.all(
      Array.from(new Set(majors.map((m) => m.institutionId))).map(
        async (instId) => {
          const university = await this.userRepo.findById(instId);
          if (university?.userType === 'UNIVERSITY') {
            universityMap[instId] = {
              id: university.id,
              name: university.name,
              email: university.email,
              address: university.address || '',
              zone: university.zone || '',
              locality: university.locality || '',
              price_range: university.price_range || 'MEDIUM',
              aceptation_difficulty: university.aceptation_difficulty || 'MEDIUM',
              description: university.description || '',
              link: university.link || '',
              events: (university.events || []).map(event => ({
                name: event.name,
                description: event.description,
                date: event.date,
                location: event.location
              }))
            };
          }
        },
      ),
    );

    // 5) Filtra, agrupa y crea la respuesta enriquecida
    const group1: RecommendationWithUniversityInfo[] = [];
    const group2: RecommendationWithUniversityInfo[] = [];
    const group3: RecommendationWithUniversityInfo[] = [];

    for (const major of majors) {
      if (!major.preferences.some((p) => userPrefs.includes(p))) continue;
      const university = universityMap[major.institutionId];
      if (!university) continue;

      const sameZone = university.zone === userZone;
      const sameLocality = university.locality === userLocality;

      // Crear el objeto de recomendación enriquecido
      const enrichedRecommendation: RecommendationWithUniversityInfo = {
        _id: major.id,
        name: major.name,
        description: major.description,
        difficulty: major.difficulty,
        price: major.price,
        focus: major.focus,
        institutionId: major.institutionId,
        pensumLink: major.pensumLink,
        jobOpportunityIds: major.jobOpportunityIds,
        preferences: major.preferences,
        createdAt: major.createdAt.toISOString(),
        updatedAt: major.updatedAt.toISOString(),
        university: university
      };

      if (sameZone && sameLocality) {
        group1.push(enrichedRecommendation);
      } else if (sameZone) {
        group2.push(enrichedRecommendation);
      } else {
        group3.push(enrichedRecommendation);
      }
    }

    // 6) Devuelve ordenado
    return [...group1, ...group2, ...group3];
  }
}