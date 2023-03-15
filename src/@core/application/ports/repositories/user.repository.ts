import { User } from '@/@core/domain/entities';

export interface UserRepository {
  getUserByEmail(email: string): Promise<User>;
  updateUser(user: User): Promise<void>;
  getUserByUserId(userId: number): Promise<User>;
  addUser(user: User): Promise<User>;
}
