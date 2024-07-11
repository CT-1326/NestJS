import { Injectable } from '@nestjs/common';

@Injectable()
export class ChefService {
  private meet;
  constructor() {
    this.meet = 0;
  }

  sliceMeet() {
    console.log('고기를 자른다');
    this.meet++;
    return '고기를 잘랐다!';
  }

  cookSteak() {
    if (this.meet > 0) {
      console.log('스테이끼 굽는다');
      this.meet--;
      return '스테이끼';
    } else {
      console.log('스테이끼 없다');
      return '재료 없다!';
    }
  }
}
