import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './commons/auth/auth.module';
import { CommonModule } from './commons/common.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ProductsModule, UserModule, AuthModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
