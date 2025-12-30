import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity('employee_address')
export class EmployeeAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addressLine1: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  pincode: string;

  @OneToOne(() => Employee, employee => employee.address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
