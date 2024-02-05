import { IsInt, IsString } from 'class-validator';

export class createProductInput {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;
}
