import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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

  findAll() {
    return this.repo.find();
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
}
