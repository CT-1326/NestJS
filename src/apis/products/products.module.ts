import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { productSalesLocation } from './entities/productSalesLocation.entity';
import { productTags } from './entities/productTags.entity';
import { productCategory } from './entities/productCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      productSalesLocation,
      productTags,
      productCategory,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
