import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

// This should be a real class/interface representing a user entity
//export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: UserDto) {
    return this.userRepository.save(user);
  }

  async findOne(query: FindOptionsWhere<User>) {
    return this.userRepository.findOne({ where: query });
  }
}
