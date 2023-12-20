import { Module } from '@nestjs/common';
import { ChefModule } from './apis/chef/chef.module';
import { WaiterModule } from './apis/waiter/waiter.module';

@Module({
  imports: [ChefModule, WaiterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
