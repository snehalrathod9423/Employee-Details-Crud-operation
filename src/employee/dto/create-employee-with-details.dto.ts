import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { EmployeeAddress } from '../employee-address.entity';
import { EmployeeBankDetails } from '../employee-bankdetails.entity';

export class CreateEmployeeWithDetailsDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  address: EmployeeAddress;

  bankDetails: EmployeeBankDetails;
}
