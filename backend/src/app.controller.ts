import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    return await this.appService.getAllMicroservicesHealth();
  }

  @Get('health/simple')
  getSimpleHealth() {
    return this.appService.getSystemHealth();
  }

  @Get('ping')
  getPing() {
    return { message: 'pong', timestamp: new Date().toISOString() };
  }
}
