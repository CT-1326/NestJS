import { Module } from '@nestjs/common';
import { WaiterController } from './waiter.controller';
import { WaiterService } from './waiter.service';
import { ChefModule } from '../chef/chef.module';

@Module({
  imports: [ChefModule],
  controllers: [WaiterController],
  providers: [WaiterService],
})
export class WaiterModule {}
