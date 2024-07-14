import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProductInput {
  @IsString()
  id: string;

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
