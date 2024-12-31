import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async CreateNewUser(createUserDto: CreateUserDto): Promise<User> {
    const createUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(createUser);
  }

  async GetAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async GetUserById(UserID: number): Promise<User> {
    return this.userRepository.findOneBy({ UserID });
  }

  async GetUserByKeyWord(searchParams: Partial<User>): Promise<User> {
    return this.userRepository.findOneBy({
      ...searchParams,
    });
  }

  async UpdateUserById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
  }

  async DeleteNewUserById(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findUserByEmail(Email: string): Promise<User> {
    return this.userRepository.findOneBy({ Email });
  }
}
