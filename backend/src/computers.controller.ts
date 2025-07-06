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

@Controller('api')
export class ComputersController {
  private readonly serviceUrl = process.env.BACKEND_COMPUTERS_SERVICE_URL!;

  constructor(private readonly proxyService: ProxyService) {}

  @Get('labs')
  async getAllLabs(@Res() res: Response) {
    const result = await this.proxyService.get(this.serviceUrl, '/api/labs');
    return res.status(result.status).json(result.data);
  }

  @Get('labs/:id')
  async getLabById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      `/api/labs/${id}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Post('labs')
  async createLab(@Body() labData: any, @Res() res: Response) {
    const result = await this.proxyService.post(
      this.serviceUrl,
      '/api/labs',
      labData,
    );
    return res.status(result.status).json(result.data);
  }

  @Put('labs/:id')
  async updateLab(
    @Param('id') id: string,
    @Body() labData: any,
    @Res() res: Response,
  ) {
    const result = await this.proxyService.put(
      this.serviceUrl,
      `/api/labs/${id}`,
      labData,
    );
    return res.status(result.status).json(result.data);
  }

  @Delete('labs/:id')
  async deleteLab(@Param('id') id: string, @Res() res: Response) {
    const result = await this.proxyService.delete(
      this.serviceUrl,
      `/api/labs/${id}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Get('computers')
  async getAllComputers(@Res() res: Response) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      '/api/computers',
    );
    return res.status(result.status).json(result.data);
  }

  @Get('computers/:id')
  async getComputerById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      `/api/computers/${id}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Post('computers')
  async createComputer(@Body() computerData: any, @Res() res: Response) {
    const result = await this.proxyService.post(
      this.serviceUrl,
      '/api/computers',
      computerData,
    );
    return res.status(result.status).json(result.data);
  }

  @Put('computers/:id')
  async updateComputer(
    @Param('id') id: string,
    @Body() computerData: any,
    @Res() res: Response,
  ) {
    const result = await this.proxyService.put(
      this.serviceUrl,
      `/api/computers/${id}`,
      computerData,
    );
    return res.status(result.status).json(result.data);
  }

  @Delete('computers/:id')
  async deleteComputer(@Param('id') id: string, @Res() res: Response) {
    const result = await this.proxyService.delete(
      this.serviceUrl,
      `/api/computers/${id}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Get('labs/:labId/computers')
  async getComputersByLabId(
    @Param('labId') labId: string,
    @Res() res: Response,
  ) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      `/api/labs/${labId}/computers`,
    );
    return res.status(result.status).json(result.data);
  }
}
