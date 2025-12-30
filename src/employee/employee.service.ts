import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from './employee.entity';
import { CreateEmployeeWithDetailsDto } from './dto/create-employee-with-details.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
  ) {}

  async createEmployeeWithDetails(dto: CreateEmployeeWithDetailsDto) {
    const employee = this.repo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      position: dto.position,
      salary: dto.salary,
      address: dto.address,
      bankDetails: dto.bankDetails,
    });

    return await this.repo.save(employee);
  }

  findAll(opts?: { page?: number; limit?: number; search?: string }) {
    const qb = this.repo.createQueryBuilder('employee');

    if (opts?.search) {
      qb.where(
        'employee.firstName ILIKE :s OR employee.lastName ILIKE :s OR employee.email ILIKE :s',
        { s: `%${opts.search}%` },
      );
    }

    const page = opts?.page && opts.page > 0 ? opts.page : 1;
    const limit = opts?.limit && opts.limit > 0 ? Math.min(opts.limit, 100) : 10;
    qb.skip((page - 1) * limit).take(limit);

    return qb.getMany();
  }

  async findOneWithDetails(id: string) {
    const employee = await this.repo.findOne({
      where: { id },
      relations: ['address', 'bankDetails'],
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }
}
