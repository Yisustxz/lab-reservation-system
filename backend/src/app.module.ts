import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComputersController } from './computers.controller';
import { DatabaseModule } from './database/database.module';
import { ProxyService } from './proxy.service';
import { ReservationsController } from './reservations.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AppController,
    UsersController,
    ComputersController,
    ReservationsController,
  ],
  providers: [AppService, ProxyService],
})
export class AppModule {}
