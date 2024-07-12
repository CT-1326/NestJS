import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/createProduct.dto';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductsService {
  private incrementID = 1;
  private products: Product[] = [];

  create(input: CreateProductInput) {
    console.log(input);
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
  findeOne(id: number) {
    console.log(id, typeof id);
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
    console.log(idx);
    if (idx === -1) {
      return false;
    }
    this.products.splice(idx, 1);
    return true;
  }
}
