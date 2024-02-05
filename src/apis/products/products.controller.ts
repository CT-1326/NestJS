import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';
import { Product } from './interface/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  createProduct(
    @Body() createProductInput: createProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() input: UpdateProductInput,
  ): Promise<Product> {
    if (id != input.id) {
      throw new ForbiddenException();
    }
    return this.productService.modify(input);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<boolean> {
    return this.productService.delete(id);
  }

  @Get()
  fetchProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  fetchProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }
}
