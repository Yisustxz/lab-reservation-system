import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computer } from '../entities/computer.entity';
import { Lab } from '../entities/lab.entity';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST + '',
      port: parseInt(process.env.DB_PORT + ''),
      username: process.env.DB_USER + '',
      password: process.env.DB_PASS + '',
      database: process.env.DB_NAME + '',
      entities: [User, Lab, Computer, Reservation],
      synchronize: true,
      logging: false,
      extra: {
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
        acquireTimeoutMillis: 60000,
        timeout: 60000,
      },
    }),
  ],
})
export class DatabaseModule {}
