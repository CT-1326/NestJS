import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSalesLocation } from './entities/productSalesLocation.entity';
import { ProductTag } from './entities/productTags.entity';
import { ProductCategory } from './entities/productCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSalesLocation,
      ProductTag,
      ProductCategory,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
