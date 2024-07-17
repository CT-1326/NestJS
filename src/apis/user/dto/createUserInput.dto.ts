import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;
}
