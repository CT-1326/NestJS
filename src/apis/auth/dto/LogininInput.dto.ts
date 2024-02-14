import { IsInt, IsOptional, IsString } from 'class-validator';

export class LogininInput {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
