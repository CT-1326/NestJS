import { Injectable } from '@nestjs/common';
import { createProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';
// import { Product } from './interface/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(input: createProductInput): Promise<Product> {
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

  async delete(id: number): Promise<boolean> {
    const result = await this.productRepository.softDelete({ id: id });
    return result.affected ? true : false;
  }

  async findAll(): Promise<Product[]> {
    const result = await this.productRepository.find({
      order: { id: 'DESC' },
    });
    return result;
  }

  async findOne(id: number): Promise<Product> {
    const result = await this.productRepository.findOne({
      where: { id: id },
    });
    return result;
  }
}
