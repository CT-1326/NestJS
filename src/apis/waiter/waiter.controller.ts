import { Controller, Get } from '@nestjs/common';
import { WaiterService } from './waiter.service';
import { ChefService } from '../chef/chef.service';

@Controller('waiter')
export class WaiterController {
  constructor(
    private readonly waiterService: WaiterService,
    private readonly chefService: ChefService,
  ) {}

  @Get('clean')
  cleanTable() {
    return this.waiterService.clean();
  }

  @Get('order')
  servingSteak() {
    const food = this.chefService.cookSteak();
    if (food === '재료 없다!') {
      return `${food} 주문 못 받는다!`;
    } else {
      return this.waiterService.serving(food);
    }
  }
}
