import { Injectable } from '@nestjs/common';
// import { Product } from './interfaces/product.interface';import { CreateProductInput } from './dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    const result = await this.productRepository.save({
      ...input,
    });

    return result;
  }

  async modify(input: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: input.id },
    });

    const newProduct = {
      ...product,
      ...input,
    };

    const result = await this.productRepository.save(newProduct);
    return result;
  }
}
