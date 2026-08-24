import { BadRequestException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from './user.service';

describe('UserService', () => {
  let userRepository: {
    create: jest.Mock;
    findOne: jest.Mock;
    findByEmail: jest.Mock;
    findAll: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  let service: UserService;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new UserService(userRepository as any);
  });

  it('should create a user with hashed password when passwords match', async () => {
    const dto = {
      name: 'Maria',
      email: 'maria@email.com',
      password: 'senha123',
      confirmPassword: 'senha123',
    };

    userRepository.create.mockResolvedValue({
      id: 1,
      ...dto,
      password: 'hashed-password',
    });

    const result = await service.create(dto);

    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(result.password).not.toBe(dto.password);
    expect(await compare(dto.password, result.password)).toBe(true);
  });

  it('should reject user creation when password and confirmPassword do not match', async () => {
    const dto = {
      name: 'Maria',
      email: 'maria@email.com',
      password: 'senha123',
      confirmPassword: 'senha456',
    };

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should reject user creation when password is missing', async () => {
    const dto = {
      name: 'Maria',
      email: 'maria@email.com',
      password: '',
      confirmPassword: '',
    };

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
