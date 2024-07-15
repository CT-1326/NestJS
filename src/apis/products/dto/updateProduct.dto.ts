import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductInput {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  price?: number;
}
