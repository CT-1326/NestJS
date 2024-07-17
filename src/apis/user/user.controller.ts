import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUserInput.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  PASSWORD_SALT = 10;
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() input: CreateUserInput): Promise<boolean> {
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
