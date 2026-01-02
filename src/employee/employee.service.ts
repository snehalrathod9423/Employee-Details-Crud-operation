import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';


import { Employee } from './employee.entity';
import { CreateEmployeeWithDetailsDto } from './dto/create-employee-with-details.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
  ) {}

  // ---------------- BASIC CRUD ----------------

  async create(dto: any) {
    const employee = this.repo.create(dto);
    return this.repo.save(employee);
  }

  async update(id: string, dto: any) {
    const employee = await this.repo.findOne({ where: { id } });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    Object.assign(employee, dto);
    return this.repo.save(employee);
  }

  async remove(id: string) {
    const employee = await this.repo.findOne({ where: { id } });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.repo.remove(employee);
  }

  // ---------------- CREATE WITH DETAILS ----------------

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

    return this.repo.save(employee);
  }

  // ---------------- FIND ALL ----------------

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

  // ---------------- FIND ONE WITH DETAILS ----------------

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

  // ---------------- PDF GENERATION ----------------

  async generateEmployeePdf(id: string): Promise<Buffer> {
    const employee = await this.findOneWithDetails(id);

    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {});

    doc.fontSize(18).text('Employee Details', { underline: true });
    doc.moveDown();

    doc.fontSize(12).text(`First Name: ${employee.firstName}`);
    doc.text(`Last Name: ${employee.lastName}`);
    doc.text(`Email: ${employee.email}`);
    doc.text(`Position: ${employee.position || '-'}`);
    doc.text(`Salary: ${employee.salary || '-'}`);

    doc.moveDown();
    doc.text(`City: ${employee.address ? employee.address.city : '-'}`);
doc.text(`State: ${employee.address ? employee.address.state : '-'}`);
doc.text(`Pincode: ${employee.address ? employee.address.pincode : '-'}`);

doc.moveDown();
doc.text('Bank Details');
doc.text(`Bank Name: ${employee.bankDetails ? employee.bankDetails.bankName : '-'}`);
doc.text(`Account Number: ${employee.bankDetails ? employee.bankDetails.accountNumber : '-'}`);
doc.text(`IFSC Code: ${employee.bankDetails ? employee.bankDetails.ifscCode : '-'}`);
    doc.end();

    return Buffer.concat(buffers);
  }

  // ---------------- CSV EXPORT ----------------

  async exportEmployeesCsv(): Promise<string> {
    const employees = await this.repo.find();

    const parser = new Parser({
      fields: [
        'id',
        'firstName',
        'lastName',
        'email',
        'role',
        'salary',
      ],
    });

    return parser.parse(employees);
  }
}
