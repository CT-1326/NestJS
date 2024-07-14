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
import { CreateProductInput } from './dto/createProduct.dto';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  createProduct(@Body() input: CreateProductInput): Promise<Product> {
    return this.productService.create(input);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() input: UpdateProductInput,
  ): Promise<Product> {
    if (id != input.id) {
      throw new ForbiddenException();
    }
    return this.productService.modify(input);
  }

  // @Get(':id')
  // fetchProduct(@Param('id') id: number): Product {
  //   return this.productService.findeOne(id);
  // }

  // @Get()
  // fetchProducts(): Product[] {
  //   return this.productService.findAll();
  // }

  // @Delete(':id')
  // deleteProduct(@Param('id') id: number): boolean {
  //   return this.productService.delete(id);
  // }
}
