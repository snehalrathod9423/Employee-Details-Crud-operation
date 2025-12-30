import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    const p = Number(page) || 1;
    const l = Number(limit) || 10;
    return this.svc.findAll({ search, page: p, limit: l });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
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
createEmployeeWithDetails(@Body() body: CreateEmployeeWithDetailsDto) {
  return this.employeeService.createEmployeeWithDetails(body);
}

@Get(':id/with-details')
getEmployeeWithDetails(@Param('id') id: string) {
  return this.employeeService.findOneWithDetails(id);
}

}
