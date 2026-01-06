import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.entity';
import { EmployeeAddress } from './employee-address.entity';
import { EmployeeBankDetails } from './employee-bankdetails.entity';
import { MailService } from '../mail/mail.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeAddress,
      EmployeeBankDetails,
    ]),
  ],
  providers: [
    EmployeeService,
    MailService, // ✅ ADD THIS
  ],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
