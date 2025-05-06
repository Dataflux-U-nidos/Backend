// src/application/usecases/user/delete-user.usecase.ts
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { UserResponseDto } from '../../dtos/';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(id: string): Promise<boolean> {
    // 1. Recuperar al usuario para saber su tipo
    const user: UserResponseDto | null = await this.userRepository.findById(id);
    if (!user) return false;
    const { userType } = user;

    // 2. Borrado en cascada según rol
    switch (userType) {
      case 'TUTOR': {
        const students = await this.userRepository.findStudentsByTutor(id);
        await Promise.all(
          students.map((s) => this.userRepository.delete(s.id)),
        );
        break;
      }
      case 'UNIVERSITY': {
        const infos =
          await this.userRepository.findInfoManagersByUniversity(id);
        const viewers = await this.userRepository.findViewersByUniversity(id);
        await Promise.all([
          ...infos.map((i) => this.userRepository.delete(i.id)),
          ...viewers.map((v) => this.userRepository.delete(v.id)),
        ]);
        break;
      }
      case 'ADMIN': {
        const marketers = await this.userRepository.findMarketersByAdmin(id);
        const supports = await this.userRepository.findSupportsByAdmin(id);
        const finances = await this.userRepository.findFinancesByAdmin(id);
        await Promise.all([
          ...marketers.map((m) => this.userRepository.delete(m.id)),
          ...supports.map((s) => this.userRepository.delete(s.id)),
          ...finances.map((f) => this.userRepository.delete(f.id)),
        ]);
        break;
      }
      default:
        break;
    }

    // 3. Borrar al usuario “padre”
    return this.userRepository.delete(id);
  }
}
