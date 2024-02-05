import { Injectable } from '@nestjs/common';
import { createProductInput } from './dto/createProduct.dto';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductsService {
  private incrementID = 1;
  private products: Product[] = [];

  create(input: createProductInput) {
    const product = {
      id: this.incrementID,
      ...input,
    };
    this.incrementID++;
    this.products.push(product);
    return true;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((el) => {
      if (el.id == id) {
        return true;
      }
    });
    return product;
  }

  delete(id: number) {
    const idx = this.products.findIndex((el) => {
      if (el.id == id) {
        return true;
      }
    });
    if (idx == -1) {
      return false;
    }
    this.products.splice(idx, 1);
    return true;
  }
}
