import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller('api/users')
export class UsersController {
  private readonly serviceUrl = process.env.BACKEND_PERSONS_SERVICE_URL!;

  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  async getAllUsers(@Res() res: Response) {
    const result = await this.proxyService.get(this.serviceUrl, '/api/users');
    return res.status(result.status).json(result.data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      `/api/users/${id}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Post()
  async createUser(@Body() userData: any, @Res() res: Response) {
    const result = await this.proxyService.post(
      this.serviceUrl,
      '/api/users',
      userData,
    );
    return res.status(result.status).json(result.data);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: any,
    @Res() res: Response,
  ) {
    const result = await this.proxyService.put(
      this.serviceUrl,
      `/api/users/${id}`,
      userData,
    );
    return res.status(result.status).json(result.data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const result = await this.proxyService.delete(
      this.serviceUrl,
      `/api/users/${id}`,
    );
    return res.status(result.status).json(result.data);
  }
}
