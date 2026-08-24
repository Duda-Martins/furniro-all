import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    const result = await this.userRepository.findAll();

    return {
      data: result,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async create(user: RegisterDto) {
    const { name, email, password, confirmPassword } = user;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    if (!password || !confirmPassword) {
      throw new BadRequestException(
        'Password and confirmPassword are required',
      );
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const newUser = {
      name,
      email,
      password: '',
    };

    const saltRounds = 10;
    newUser.password = await hash(password, saltRounds);

    return this.userRepository.create(newUser);
  }

  async update(id: number, user: User) {
    const existingUser = await this.userRepository.findOne(id);

    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    const saltRounds = 10;
    user.password = await hash(user.password, saltRounds);

    return this.userRepository.update(id, user);
  }

  async delete(id: number) {
    const existingUser = await this.userRepository.findOne(id);

    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.delete(id);
  }
}
