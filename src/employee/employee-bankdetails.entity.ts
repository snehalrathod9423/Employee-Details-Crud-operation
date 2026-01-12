import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('employee_bankdetails')
export class EmployeeBankDetails {
  @PrimaryGeneratedColumn()
  id: number;   

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  ifscCode: string;

  @OneToOne(() => Employee, employee => employee.bankDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
