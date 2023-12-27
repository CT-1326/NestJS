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
        const user = await this
            .userRepository
            .findOne({
                where: {
                    email: email
                }
            });

        if (user) {
            throw new ConflictException('이미 등록된 이메일입니다.');
        }

        const result = await this
            .userRepository
            .save({email, password, name, age});

        return result;
    }
}
