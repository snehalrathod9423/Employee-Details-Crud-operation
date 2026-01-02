import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('employee_address')
export class EmployeeAddress {
  @PrimaryGeneratedColumn()
  id: number; // ✅ FIXED (number, not string)

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  pincode: string;

  @OneToOne(() => Employee, employee => employee.address)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
