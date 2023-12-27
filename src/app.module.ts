import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './commons/auth/auth.module';
import { CommonModule } from './commons/common.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, AuthModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
