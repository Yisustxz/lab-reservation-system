import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DeploymentHelper } from './helpers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    return await this.appService.getSystemHealth();
  }

  @Get('health/simple')
  getSimpleHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'backend-main',
    };
  }

  @Get('ping')
  getPing() {
    return { message: 'pong' };
  }

  @Get('environment')
  getEnvironmentInfo() {
    return DeploymentHelper.getEnvironmentInfo();
  }
}
