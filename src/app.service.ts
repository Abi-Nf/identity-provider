import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPong(): string {
    return 'pong';
  }

  getList(){
    return {
      list: [{ message: 'you got a list content' }],
    };
  }
}
