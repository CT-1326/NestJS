import { Injectable } from '@nestjs/common';

@Injectable()
export class WaiterService {
    clean() {
        return '탁자 클린'
    }

    serving(food: string) {
        return `${food}를 서빙완료`
    }
}
