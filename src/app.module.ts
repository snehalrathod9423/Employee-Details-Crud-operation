import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config(); // 👈 ADD THIS AT THE VERY TOP

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { join } from 'path';

const useSqlite = process.env.USE_SQLITE === '1';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      useSqlite
        ? {
            type: 'sqlite',
            database: process.env.SQLITE_DB || 'database.sqlite',
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            synchronize: true,
          }
        : {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || 'postgres',
            database: process.env.DB_NAME || 'employee_db',
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            synchronize: true,
          }
    ),
    EmployeeModule,
  ],
})
export class AppModule {}
