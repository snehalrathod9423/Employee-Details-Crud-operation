import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

import { Employee } from './employee.entity';
import { EmployeeAddress } from './employee-address.entity';
import { EmployeeBankDetails } from './employee-bankdetails.entity';

import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeAddress,
      EmployeeBankDetails,
    ]),
    MailModule, // ✅ IMPORT MODULE, NOT SERVICE
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
