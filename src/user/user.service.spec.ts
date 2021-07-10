import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { createUserDto, updateUserDto, userData } from './user.mock';

describe('UserService', () => {
  let service: UserService;
  let save: jest.Mock;
  let find: jest.Mock;
  let findOne: jest.Mock;
  let remove: jest.Mock;
  const notFoundMsg = `User with id #${userData.id} is not exist`;

  beforeEach(async () => {
    save = jest.fn().mockResolvedValue(userData);
    find = jest.fn().mockResolvedValue([userData]);
    findOne = jest.fn().mockResolvedValue(userData);
    remove = jest.fn().mockResolvedValue(userData);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: { save, find, findOne, remove },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a Data', () => {
    it('should return a created user data', async () => {
      const result = await service.create(createUserDto);
      expect(result).toEqual(userData);
    });
  });

  describe('Find All', () => {
    describe('If any existing data', () => {
      it('should return array of user data', async () => {
        const result = await service.findAll();
        expect(result).toEqual([userData]);
      });
    });

    describe('If no existing data', () => {
      beforeEach(() => {
        find.mockResolvedValue([]);
      });
      it('should return an empty array', async () => {
        const result = await service.findAll();
        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Find One By Id', () => {
    describe('If data is exist', () => {
      it('should return a user data', async () => {
        const result = await service.findById(userData.id);
        expect(result).toEqual(userData);
      });
    });

    describe('If data is not found', () => {
      beforeEach(() => {
        findOne.mockRejectedValue(new Error(notFoundMsg));
      });
      it('should throw an not found exception', async () => {
        await expect(service.findById(userData.id)).rejects.toThrowError(
          notFoundMsg,
        );
      });
    });
  });

  describe('Update a Data', () => {
    describe('If data is exist', () => {
      beforeEach(() => {
        save.mockResolvedValue({
          ...userData,
          name: updateUserDto.name,
        });
      });
      it('should return an updated data', async () => {
        const result = await service.update(userData.id, updateUserDto);
        expect(result.name).toEqual(updateUserDto.name);
      });
    });

    describe('If data is not exist', () => {
      beforeEach(() => {
        findOne.mockRejectedValue(new Error(notFoundMsg));
      });
      it('should throw a not found exception', async () => {
        await expect(
          service.update(userData.id, updateUserDto),
        ).rejects.toThrowError(notFoundMsg);
      });
    });
  });

  describe('Remove a Data', () => {
    describe('if data is exist', () => {
      it('should return a removed data', async () => {
        const result = await service.remove(userData.id);
        expect(result).toEqual(userData);
      });
    });

    describe('If data is not exist', () => {
      beforeEach(() => {
        findOne.mockRejectedValue(new Error(notFoundMsg));
      });
      it('should throw a not found exception', async () => {
        await expect(service.remove(userData.id)).rejects.toThrowError(
          notFoundMsg,
        );
      });
    });
  });
});
