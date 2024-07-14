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
  // findAll() {
  //   return this.products;
  // }
  // findeOne(id: number) {
  //   console.log(id, typeof id);
  //   const product = this.products.find((el) => {
  //     if (el.id == id) {
  //       return true;
  //     }
  //   });
  //   return product;
  // }
  // delete(id: number) {
  //   const idx = this.products.findIndex((el) => {
  //     if (el.id == id) {
  //       return true;
  //     }
  //   });
  //   console.log(idx);
  //   if (idx === -1) {
  //     return false;
  //   }
  //   this.products.splice(idx, 1);
  //   return true;
  // }
}
