import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmployeeWithDetailsDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  address: {
    city: string;
    state: string;
    pincode: string;
  };

  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
}
