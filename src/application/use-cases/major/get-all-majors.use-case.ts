import { IMajorRepository } from '../../../domain';
import { MajorResponseDto } from '../../dtos';

export class GetAllMajorsUseCase {
  constructor(private readonly majorRepository: IMajorRepository) {}

  public async execute(): Promise<MajorResponseDto[]> {
    return this.majorRepository.findAll();
  }
}
