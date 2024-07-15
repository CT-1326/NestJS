import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProductInput {
  @IsInt()
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
