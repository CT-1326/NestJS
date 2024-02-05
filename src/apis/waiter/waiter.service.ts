import { Injectable } from '@nestjs/common';

@Injectable()
export class WaiterService {
  clean() {
    return '탁자를 깨끗하게 닦았습니다.';
  }
  serving(food: string) {
    return `${food}를 서빙하였습니다.`;
  }
}
