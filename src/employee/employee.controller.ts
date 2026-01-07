import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeWithDetailsDto } from './dto/create-employee-with-details.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleMiddleware } from '../common/middleware/role.middleware';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly svc: EmployeeService) {}

  // Basic create (employee only)
  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.svc.create(dto);
  }

  // Get all employees (pagination + search)
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const p = Number(page) || 1;
    const l = Number(limit) || 10;
    return this.svc.findAll({ search, page: p, limit: l });
  }

  // Get employee with address + bank details
  @Get(':id/with-details')
  getEmployeeWithDetails(@Param('id') id: string) {
    return this.svc.findOneWithDetails(id);
  }

  // Update employee
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.svc.update(id, dto);
  }

  // Delete employee
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }

  // Create employee + address + bank (single payload)
  @Post('with-details')
  createEmployeeWithDetails(@Body() dto: CreateEmployeeWithDetailsDto) {
    return this.svc.createEmployeeWithDetails(dto);
  }

  // Download employee details as PDF
  @Get('pdf/:id')
  async downloadPdf(@Param('id') id: string, @Res() res: Response) {
    const pdfBuffer = await this.svc.generateEmployeePdf(id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=employee.pdf',
    );

    res.send(pdfBuffer);
  }

  // Export all employees as CSV
  @Get('export/csv')
  async exportCsv(@Res() res: Response) {
    const csv = await this.svc.exportEmployeesCsv();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=employees.csv',
    );

    res.send(csv);
  }

  //  ADMIN ONLY – Add employee (NEW API)
  @UseGuards(JwtAuthGuard, RoleMiddleware)
  @Post('add')
  addEmployee(@Body() body) {
    return this.svc.addEmployee(body);
  }

  @Get()
   findAll(
   @Query('page') page = '1',
   @Query('limit') limit = '10',
   @Query('role') role?: string,
   @Query('search') search?: string,
   ) {
   return this.employeeService.findAll({
    page: Number(page),
    limit: Number(limit),
    role,
    search,
  });
  }
  @Get('list')
  getEmployeeList(@Query() query) {
  return this.svc.listEmployeesWithFilters(query);
  }


}
