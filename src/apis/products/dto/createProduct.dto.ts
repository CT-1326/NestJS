import { IsInt, IsObject, IsString, Min } from 'class-validator';
import { CreateProductSalesLocationInput } from './CreateProductSalesLocationInput.dto';

export class CreateProductInput {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsObject()
  productSalesLocation: CreateProductSalesLocationInput;

  @IsString()
  productCategory: string;

  @IsString({ each: true })
  productTags: string[];
}
