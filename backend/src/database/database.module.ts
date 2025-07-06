import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computer } from '../entities/computer.entity';
import { Lab } from '../entities/lab.entity';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../entities/user.entity';

const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is not defined`);
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
      entities: [User, Lab, Computer, Reservation],
      synchronize: true,
      logging: false,
    }),
  ],
})
export class DatabaseModule {}
