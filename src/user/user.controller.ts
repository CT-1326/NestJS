import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt'
import { CreateUserInput } from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    PASSWORD_SALT = 10;
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() input: CreateUserInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(input.password, this.PASSWORD_SALT);
        const user = {
            ...input,
            password: hashedPassword
        };

        return this
            .userService
            .create(user);
    }

    @UseGuards(AuthGuard('access'))
    @Get(':email')
    getEmail(@Param('email') email: string): Promise<User> {
        return this
            .userService
            .findOne(email);
    }
}
