import { Controller, Get } from '@nestjs/common';
import { WaiterService } from './waiter.service';
import { ChefService } from '../chef/chef.service';

@Controller('waiter')
export class WaiterController {
    constructor(
        private readonly waiterService: WaiterService,
        private readonly chefService: ChefService
    ) {}

    @Get('clean')
    cleanTable() {
        return this.waiterService.clean();
    }

    @Get('order')
    servingSteak() {
        const food = this.chefService.cookSteak();
        if (food === "재료소진") {
            return "재료가 소진됨";
        } else {
            return this.waiterService.serving(food);
        }
    }
}
