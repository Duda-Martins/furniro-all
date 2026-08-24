import { UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let usersService: { findByEmail: jest.Mock };
  let jwtService: { sign: jest.Mock };
  let service: AuthService;

  beforeEach(() => {
    usersService = {
      findByEmail: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
    };

    service = new AuthService(usersService as any, jwtService as any);
  });

  it('should return an access token for a valid user', async () => {
    const passwordHash = await hash('senha123', 10);
    usersService.findByEmail.mockResolvedValue({
      id: 42,
      email: 'user@email.com',
      password: passwordHash,
    });
    jwtService.sign.mockReturnValue('jwt-token');

    const result = await service.login({
      email: 'user@email.com',
      password: 'senha123',
    });

    expect(usersService.findByEmail).toHaveBeenCalledWith('user@email.com');
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: 42,
      email: 'user@email.com',
    });
    expect(result).toEqual({ access_token: 'jwt-token' });
  });

  it('should reject invalid credentials', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: 42,
      email: 'user@email.com',
      password: await hash('senhaCorreta', 10),
    });

    await expect(
      service.login({
        email: 'user@email.com',
        password: 'senhaErrada',
      }),
    ).rejects.toThrow(UnauthorizedException);
    expect(jwtService.sign).not.toHaveBeenCalled();
  });
});
