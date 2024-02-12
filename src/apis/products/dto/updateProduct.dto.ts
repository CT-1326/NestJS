import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';
import { UpdateProductSalesLocationInput } from './updateProductSalesLocation.dto';

export class UpdateProductInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsObject()
  productSalesLocation: UpdateProductSalesLocationInput;

  @IsString()
  productCategory: string;

  @IsString({ each: true })
  productTags: string[];
}
