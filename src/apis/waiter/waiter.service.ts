import { Injectable } from '@nestjs/common';

@Injectable()
export class WaiterService {
  clean() {
    console.log('탁자 닦는다');
    return '탁자를 깨끗하게 닦았다!';
  }

  serving(food: string) {
    console.log(`${food} 서빙한다`);
    return `${food}를 서빙했다`;
  }
}
