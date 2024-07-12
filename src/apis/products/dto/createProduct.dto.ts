import { IsInt, IsString } from 'class-validator';

export class CreateProductInput {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;
}
