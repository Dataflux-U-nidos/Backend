import { IUserRepository, User } from '../../../domain';
import argon2 from 'argon2';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: Omit<User, 'id'>): Promise<User> {
    const hashedPassword = await argon2.hash(data.password);

    const userWithHashedPassword = {
      ...data,
      password: hashedPassword,
    };

    return this.userRepository.create(userWithHashedPassword);
  }
}
