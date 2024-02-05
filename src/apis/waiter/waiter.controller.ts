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
    if (food === '재료소진') {
      return '재료가 소진되었습니다. 주문을 받을 수 없습니다.';
    } else {
      return this.waiterService.serving(food);
    }
  }
}
