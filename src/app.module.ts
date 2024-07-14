import { Module } from '@nestjs/common';
import { ProductsModule } from './apis/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/TypeOrmConfigService';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, // 환경변수 캐싱 설정
      isGlobal: true, // 환경변수 전역 설정
    }),
    TypeOrmModule.forRootAsync({
      // TypeORM 설정 비동기 처리
      useClass: TypeOrmConfigService,
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
