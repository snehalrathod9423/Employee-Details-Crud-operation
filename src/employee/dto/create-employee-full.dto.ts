export class CreateEmployeeFullDto {
  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  salary?: number;

  address: {
    addressLine1: string;
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
