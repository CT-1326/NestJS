import { Module } from '@nestjs/common';
import { ProductsModule } from './apis/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
