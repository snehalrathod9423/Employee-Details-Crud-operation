import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeWithDetailsDto } from './dto/create-employee-with-details.dto';
import { EmployeeAddress } from '../employee-address/employee-address.entity';
import { EmployeeBankDetails } from '../employee-bankdetails/employee-bankdetails.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>
  ) {}

  create(createDto: CreateEmployeeDto) {
    const ent = this.repo.create(createDto as any);
    return this.repo.save(ent);
  }

  findAll(opts?: { page?: number; limit?: number; search?: string }) {
    const qb = this.repo.createQueryBuilder('employee');
    if (opts?.search) {
      qb.where(
        'employee.firstName ILIKE :s OR employee.lastName ILIKE :s OR employee.email ILIKE :s',
        { s: `%${opts.search}%` }
      );
    }

    const page = opts?.page && opts.page > 0 ? opts.page : 1;
    const limit = opts?.limit && opts.limit > 0 ? Math.min(opts.limit, 100) : 10;
    qb.skip((page - 1) * limit).take(limit);

    return qb.getMany();
  }

  async findOne(id: string) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException('Employee not found');
    return e;
  }

  async update(id: string, updateDto: UpdateEmployeeDto) {
    const e = await this.findOne(id);
    Object.assign(e, updateDto as any);
    return this.repo.save(e);
  }

  async remove(id: string) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { deleted: true };
  }

  // ✅ Create employee with address & bank details
  async createEmployeeWithDetails(dto: CreateEmployeeWithDetailsDto) {
    // Create address entity
    const address = new EmployeeAddress();
    address.addressLine1 = dto.address.addressLine1;
    address.city = dto.address.city;
    address.state = dto.address.state;
    address.pincode = dto.address.pincode;

    // Create bank details entity
    const bankDetails = new EmployeeBankDetails();
    bankDetails.bankName = dto.bankDetails.bankName;
    bankDetails.accountNumber = dto.bankDetails.accountNumber;
    bankDetails.ifscCode = dto.bankDetails.ifscCode;

    // Create employee and assign relations
    const employee = this.repo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      position: dto.position,
      salary: dto.salary,
      address: address,
      bankDetails: bankDetails,
    });

    return await this.repo.save(employee);
  }

  // ✅ Get employee with address & bank details
  async findOneWithDetails(id: string) {
    const employee = await this.repo.findOne({
      where: { id },
      relations: ['address', 'bankDetails'], // match OneToOne relations
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }
  async getEmployeeFullData(id: string) {
  return this.employeeRepository.findOne({
    where: { id },
    relations: ['address', 'bankDetails'],
  });
 } 
}