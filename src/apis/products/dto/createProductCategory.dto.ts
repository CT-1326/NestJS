import { IsString } from 'class-validator';

export class CreateProductCategory {
  @IsString()
  name: string;
}
