import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../products/entities/user.entity';
import { CreateUserInput } from './dto/CreateUserInput.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  PASSWORD_SALT = 10;
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      input.password,
      this.PASSWORD_SALT,
    );
    const user = {
      ...input,
      password: hashedPassword,
    };
    return this.userService.create(user);
  }
}
