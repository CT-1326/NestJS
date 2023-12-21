import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/createProduct.dto';
import { Product } from "./interfaces/product.interface";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    createProduct(@Body() createProductInput: CreateProductInput): boolean {
        console.log(createProductInput);
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
    deelteProduct(@Param('id') id: number): boolean {
        return this.productService.delete(id);
    }
}
