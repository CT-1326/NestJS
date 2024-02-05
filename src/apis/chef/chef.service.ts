import { Injectable } from '@nestjs/common';

@Injectable()
export class ChefService {
  private meet;
  constructor() {
    this.meet = 0;
  }

  sliceMeet() {
    this.meet++;
    return '고기를 잘랐습니다.';
  }
  cookSteak() {
    if (this.meet > 0) {
      this.meet--;
      return '스테이크';
    } else {
      return '재료소진';
    }
  }
}
