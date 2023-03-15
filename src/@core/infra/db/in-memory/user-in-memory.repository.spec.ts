import { User } from '@/@core/domain/entities';
import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository', () => {
  describe('addUser', () => {
    it('should add a new user', async () => {
      const user = User.create({
        email: 'any@example.com',
        emailVerified: false,
        name: 'any',
        password: 'any_password',
      }).value as User;

      const repository = new UserInMemoryRepository([]);

      await repository.addUser(user);

      expect(repository.items[0]).toEqual(user);
    });
  });

  describe('getUserByEmail', () => {
    it('should obtain user by e-mail', async () => {
      const user = User.create({
        email: 'any@example.com',
        emailVerified: false,
        name: 'any',
        password: 'any_password',
      }).value as User;

      const repository = new UserInMemoryRepository([user]);

      const userFound = await repository.getUserByEmail('any@example.com');

      expect(userFound).toEqual(user);
    });
  });

  describe('getUserByUserId', () => {
    it('should obtain user by id', async () => {
      const user = User.create({
        id: 1,
        email: 'any@example.com',
        emailVerified: false,
        name: 'any',
        password: 'any_password',
      }).value as User;

      const repository = new UserInMemoryRepository([user]);

      const userFound = await repository.getUserByUserId(user.id);

      expect(userFound).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update existing user', async () => {
      const user = User.create({
        id: 1,
        email: 'any@example.com',
        emailVerified: false,
        name: 'any',
        password: 'any_password',
      }).value as User;

      const repository = new UserInMemoryRepository([user]);

      user.verifyEmail();
      await repository.updateUser(user);

      expect(repository.items[0].emailVerified).toBeTruthy();
    });

    it('should not update non existing user', async () => {
      const user1 = User.create({
        id: 1,
        email: 'any@example.com',
        emailVerified: false,
        name: 'any',
        password: 'any_password',
      }).value as User;

      const repository = new UserInMemoryRepository([user1]);

      const user2 = User.create({
        id: 2,
        email: 'any@example.com',
        emailVerified: false,
        name: 'any',
        password: 'any_password',
      }).value as User;
      await repository.updateUser(user2);

      expect(repository.items[0].emailVerified).toBeFalsy();
    });
  });
});
