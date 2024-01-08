import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
      findOne: jest.fn(entity => entity),
    }));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,{ provide: getRepositoryToken(User), useFactory: repositoryMockFactory}]
    }).compile();
    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const expected = Promise.all([{
        id: 0,
        firstname: 'John',
        lastname: 'Die',
        age: 23,
        password: '123'
      }]);
      jest.spyOn(service, 'getAllUsers').mockImplementation(() => expected);
      expect(await controller.getAllUsers()).toBe(await expected);
    });
  });


  describe('getById', () => {
    it('should return a single user with the provided id', async () => {
      const user1 = { id: 0, firstname: 'John', lastname: 'Dye', age: 23 , password:'123'};
      const user2 = { id: 1, firstname: 'Jane', lastname: 'Doe', age: 30, password:'456' };

      jest.spyOn(service, 'getById').mockImplementation(id => {
        const users = [user1, user2];
        const foundUser = users.find(user => user.id === id);
        return Promise.resolve(foundUser);
      });

      expect(await controller.getById({ id: 0 })).toEqual(user1);
      expect(await controller.getById({ id: 1 })).toEqual(user2);
    });
  });

  describe('getById', () => {
    it('should return a single user, with the provided id', async () => {
      const expected = { id: 0, firstname: 'john',lastname:"Dye",age:23,password:'123' }; // Exemple de données attendues

      jest.spyOn(service, 'getById').mockImplementation(id => {
        return Promise.resolve(expected); // Renvoyer les données attendues
      });

      expect(await controller.getById({ id: 0 })).toBe(expected); // Vérifier si les données renvoyées correspondent aux données attendues
    });
  });
});