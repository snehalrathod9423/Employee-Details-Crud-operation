import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeWithDetailsDto } from './dto/create-employee-with-details.dto';

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

  async createEmployeeWithDetails(dto: CreateEmployeeWithDetailsDto) {
  const employee = this.repo.create({
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,

    addresses: [
      {
        city: dto.address.city,
        state: dto.address.state,
        pincode: dto.address.pincode,
      },
    ],

    bankDetails: [
      {
        bankName: dto.bankDetails.bankName,
        accountNumber: dto.bankDetails.accountNumber,
        ifscCode: dto.bankDetails.ifscCode,
      },
    ],
  });

  return await this.repo.save(employee);
  }
  async findOneWithDetails(id: string) {
  const employee = await this.repo.findOne({
    where: { id },
    relations: ['addresses', 'bankDetails'],
  });

  if (!employee) {
    throw new NotFoundException('Employee not found');
  }

  return employee;
 }
}