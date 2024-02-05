import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createProductInput } from './dto/createProduct.dto';
import { Product } from './interface/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductInput: createProductInput): boolean {
    return this.productService.create(createProductInput);
  }

  @Get(':id')
  fetchProduct(@Param('id') id: number): Product {
    return this.productService.findOne(id);
  }

  @Get()
  fetchProducts(): Product[] {
    return this.productService.findAll();
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): boolean {
    return this.productService.delete(id);
  }
}
