import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
