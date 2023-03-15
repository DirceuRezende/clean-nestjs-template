import { UserRepository } from '@/@core/application/ports/repositories';
import { User } from '@/@core/domain/entities';

export class UserInMemoryRepository implements UserRepository {
  constructor(public items: User[] = []) {}

  getUserByEmail(email: string): Promise<User> {
    return new Promise((resolve) => {
      const user = this.items.filter((user) => user.email === email)[0];

      resolve(user);
    });
  }
  updateUser(user: User): Promise<void> {
    const index = this.items.findIndex((item) => item.id === user.id)[0];
    if (index) {
      this.items[index] = user;
    }

    return;
  }
  getUserByUserId(userId: number): Promise<User> {
    return new Promise((resolve) => {
      const user = this.items.filter((user) => user.id === userId)[0];

      resolve(user);
    });
  }
  addUser(user: User): Promise<User> {
    this.items.push(user);

    return new Promise((resolve) => {
      resolve(user);
    });
  }
}
