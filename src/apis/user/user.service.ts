import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/createUserInput.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<boolean> {
    const { name, password, email, age } = input;

    const user = await this.userRepository
      .createQueryBuilder()
      .where(`email = "${email}"`)
      .getOne();

    if (user) {
      throw new ConflictException('이미 등록된 이메일!');
    }
    const result = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email,
        password,
        name,
        age,
      })
      .execute();

    return result ? true : false;
  }

  async findOne(email): Promise<User> {
    return await this.userRepository
      .createQueryBuilder()
      .where(`email = "${email}"`)
      .getOne();
  }
}
