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

@Controller('api/reservations')
export class ReservationsController {
  private readonly serviceUrl = process.env.BACKEND_RESERVATIONS_SERVICE_URL!;

  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  async getAllReservations(@Res() res: Response) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      '/api/reservations',
    );
    return res.status(result.status).json(result.data);
  }

  @Get('details')
  async getReservationsWithDetails(@Res() res: Response) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      '/api/reservations/details',
    );
    return res.status(result.status).json(result.data);
  }

  @Get(':id')
  async getReservationById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      `/api/reservations/${id}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Post()
  async createReservation(@Body() reservationData: any, @Res() res: Response) {
    const result = await this.proxyService.post(
      this.serviceUrl,
      '/api/reservations',
      reservationData,
    );
    return res.status(result.status).json(result.data);
  }

  @Put(':id')
  async updateReservation(
    @Param('id') id: string,
    @Body() reservationData: any,
    @Res() res: Response,
  ) {
    const result = await this.proxyService.put(
      this.serviceUrl,
      `/api/reservations/${id}`,
      reservationData,
    );
    return res.status(result.status).json(result.data);
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: string, @Res() res: Response) {
    const result = await this.proxyService.delete(
      this.serviceUrl,
      `/api/reservations/${id}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Get('user/:userId')
  async getReservationsByUserId(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      `/api/reservations/user/${userId}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Get('computer/:computerId')
  async getReservationsByComputerId(
    @Param('computerId') computerId: string,
    @Res() res: Response,
  ) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      `/api/reservations/computer/${computerId}`,
    );
    return res.status(result.status).json(result.data);
  }

  @Get('status/:status')
  async getReservationsByStatus(
    @Param('status') status: string,
    @Res() res: Response,
  ) {
    const result = await this.proxyService.get(
      this.serviceUrl,
      `/api/reservations/status/${status}`,
    );
    return res.status(result.status).json(result.data);
  }
}
