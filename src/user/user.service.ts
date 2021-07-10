import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateUserDTO): Promise<User> {
    return await this.userRepository.save(dto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const existingData = await this.userRepository.findOne(id);

    if (!existingData)
      throw new NotFoundException(`User with id #${id} is not exist`);

    return existingData;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    const existingData = await this.findById(id);

    return await this.userRepository.save({
      ...existingData,
      ...dto,
    });
  }

  async remove(id: string): Promise<User> {
    const existingData = await this.findById(id);

    return await this.userRepository.remove(existingData);
  }
}
