import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsInt()
  @IsOptional()
  point: number;
}
