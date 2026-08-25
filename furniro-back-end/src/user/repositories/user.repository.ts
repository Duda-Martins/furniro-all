import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { NewUserDto } from '../dto/new-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll() {
    const qb = this.repository.createQueryBuilder('user');
    return qb.getMany();
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
    });
  }

  async create(user: NewUserDto) {
    return this.repository.save(user);
  }

  async update(id: number, user: Partial<User>) {
    await this.repository.update(id, user);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
