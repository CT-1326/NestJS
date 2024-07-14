import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
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
    const proudct = await this.productRepository.findOne({
      where: { id: input.id },
    });

    const newProduct = {
      ...proudct,
      ...input,
    };

    const result = await this.productRepository.save(newProduct);
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productRepository.softDelete({ id: id });
    return result.affected ? true : false;
  }

  async findAll(): Promise<Product[]> {
    const result = await this.productRepository.find({});
    return result;
  }

  async findeOne(id: string): Promise<Product> {
    const result = await this.productRepository.findOne({
      where: { id: id },
    });
    return result;
  }
}
