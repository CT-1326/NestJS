import { IsEmail, IsString } from 'class-validator';

export class LoginInput {
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
