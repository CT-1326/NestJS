import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    Post,
    Put
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductInput} from './dto/createProduct.dto';
import {UpdateProductInput} from './dto/updateProduct.dto';
// import { Product } from "./interfaces/product.interface";
import {Product} from './entities/product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService : ProductsService) {}

    @Post()
    createProduct(@Body()input : CreateProductInput): Promise<Product> {
        return this
            .productService
            .create(input);
    }

    @Put(':id')
    updateProduct(@Param('id')id : number, @Body()input : UpdateProductInput,): Promise<Product> {
        if(id != input.id) {
            throw new ForbiddenException();
        }
        return this
            .productService
            .modify(input);
    }

    @Delete(':id')
    deelteProduct(@Param('id')id : number): Promise<boolean> {
        return this
            .productService
            .delete(id);
    }

    @Get()
    fetchProducts(): Promise<Product[]> {
        return this
            .productService
            .findAll();
    }

    @Get(':id')
    fetchProduct(@Param('id')id : number): Promise<Product> {
        return this
            .productService
            .findOne(id);
    }
}