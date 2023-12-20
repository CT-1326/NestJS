import { Injectable } from '@nestjs/common';

@Injectable()
export class ChefService {
    private meet;
    constructor() {
        this.meet = 0;
    }

    sliceMeet() {
        console.log("고기 컽");
        this.meet++;
        return '고기를 잘랐습니다.';
    }

    cookSteak() {
        if (this.meet > 0) {
            console.log('스테이크를 굽습니다.');
            this.meet--;
            return '스테이크';
        } else {
            return '재료소진'
        }
    }
}
