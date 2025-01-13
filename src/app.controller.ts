import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseGuard } from './firebase/firebase.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  ping(): string {
    return this.appService.getPong();
  }

  @Get('list')
  @UseGuards(FirebaseGuard)
  getList() {
    return this.appService.getList();
  }
}
