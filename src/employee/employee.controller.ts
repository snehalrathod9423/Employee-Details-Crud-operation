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

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.svc.findAll({
      search,
      role,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id/with-details')
  getEmployeeWithDetails(@Param('id') id: string) {
    return this.svc.findOneWithDetails(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }

  @Post('with-details')
  createEmployeeWithDetails(@Body() dto: CreateEmployeeWithDetailsDto) {
    return this.svc.createEmployeeWithDetails(dto);
  }

  // ✅ AUTH ONLY (no RoleMiddleware)
  @UseGuards(JwtAuthGuard)
  @Post('add')
  addEmployee(@Body() body: any) {
    return this.svc.addEmployee(body);
  }

  @Get('pdf/:id')
  async downloadPdf(@Param('id') id: string, @Res() res: Response) {
    const pdf = await this.svc.generateEmployeePdf(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=employee.pdf');
    res.send(pdf);
  }

  @Get('export/csv')
  async exportCsv(@Res() res: Response) {
    const csv = await this.svc.exportEmployeesCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=employees.csv');
    res.send(csv);
  }
}
