export class CreateEmployeeWithDetailsDto {
  id?: string; // optional, not used for insert

  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  salary?: number;

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
