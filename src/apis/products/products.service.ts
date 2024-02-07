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

  async create(input: createProductInput): Promise<boolean> {
    try {
      const query = this.productRepository.createQueryBuilder();
      await query.insert().into(Product).values(input).execute();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async modify(id: number, input: UpdateProductInput): Promise<Product | null> {
    const query = this.productRepository.createQueryBuilder();
    const result = await query
      .update(Product)
      .set(input)
      .where(`id = ${id}`)
      .execute();
    if (result.affected != 0) {
      const newQuery = this.productRepository.createQueryBuilder('product');
      return await newQuery.where('product.id = :id', { id }).getOne();
    } else {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    const query = this.productRepository.createQueryBuilder();
    const result = await query
      .update(Product)
      .set({ deletedAt: new Date() })
      .where(`id = ${id}`)
      .execute();
    return result.affected ? true : false;
  }

  async findAll(): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder();
    return await query.orderBy('id', 'DESC').getMany();
  }

  async findOne(id: number): Promise<Product> {
    const query = this.productRepository.createQueryBuilder();
    return await query.where(`id = ${id}`).getOne();
  }
}
