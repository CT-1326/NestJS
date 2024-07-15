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

  async create(input: CreateProductInput): Promise<boolean> {
    const result = await this.productRepository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(input)
      .execute();
    return result ? true : false;
  }

  async modify(id: number, input: UpdateProductInput): Promise<Product> {
    const result = this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set(input)
      .where(`id=${id}`)
      .execute();
    if (result) {
      return await this.productRepository
        .createQueryBuilder()
        .where(`id=${id}`)
        .getOne();
    }
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ deletedAt: new Date() })
      .where(`id = ${id}`)
      .execute();
    return result ? true : false;
  }

  async findAll(): Promise<Product[]> {
    const result = await this.productRepository
      .createQueryBuilder()
      .orderBy('updatedAt', 'DESC')
      .getMany();
    return result;
  }

  async findeOne(id: number): Promise<Product> {
    const result = await this.productRepository
      .createQueryBuilder()
      .where(`id=${id}`)
      .getOne();
    return result;
  }
}
