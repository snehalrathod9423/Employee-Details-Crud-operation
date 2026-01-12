import * as dotenv from 'dotenv';
dotenv.config(); 

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'employee_db',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, 
      logging: false,
    }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    AuthModule,
    EmployeeModule,
  ],
})
export class AppModule {}
