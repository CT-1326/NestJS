import { Controller, Get } from '@nestjs/common';
import { ChefService } from './chef.service';

@Controller('chef')
export class ChefController {
  constructor(private readonly chefService: ChefService) {}

  @Get('ready')
  readyToCook() {
    return this.chefService.sliceMeet();
  }

  @Get('cook')
  cookSteak() {
    return this.chefService.cookSteak();
  }
}
