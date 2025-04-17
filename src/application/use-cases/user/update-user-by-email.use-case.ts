import { IUserRepository, User } from '../../../domain';
import * as argon2 from 'argon2';

export class UpdateUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    email: string,
    data: Partial<Omit<User, 'id'>>,
  ): Promise<User | null> {
    // hash password if it exists in the data
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }

    return this.userRepository.updateByEmail(email, data);
  }
}
