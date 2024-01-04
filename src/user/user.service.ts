import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository} from 'typeorm';
import {CreateUserInput} from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)private readonly userRepository : Repository<User>
    ) {}

    async create(input : CreateUserInput): Promise<User> {
        const {name, password, email, age} = input;

        const result = await this
            .userRepository
            .save({email, password, name, age});

        return result;
    }

    async findOne(email): Promise<User> {
        return await this
            .userRepository
            .findOne({
                where: {
                    email: email
                }
            });
    }
}
