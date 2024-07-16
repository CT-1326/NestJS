import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpdateProductSalesLocationInput } from './UpdateProductSalesLocationInput.dto';

export class UpdateProductInput {
  @IsNumber()
  id: number;

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
