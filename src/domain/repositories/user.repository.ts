import { UserResponseDto } from '../../application';
import { User } from '../../domain';

export interface IUserRepository {
  findAll(filter?: {
    type?: string;
    email?: string;
  }): Promise<UserResponseDto[]>;
  findById(id: string): Promise<UserResponseDto | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Omit<User, 'id'>): Promise<User>;
  update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
