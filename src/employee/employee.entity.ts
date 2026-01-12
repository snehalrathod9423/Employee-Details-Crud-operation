import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EmployeeAddress } from './employee-address.entity';
import { EmployeeBankDetails } from './employee-bankdetails.entity';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  position: string;

  @Column('numeric', { nullable: true })
  salary: number;

  @Column({ default: 'EMPLOYEE' })
  role: string;

  @Column({ default: 'ACTIVE' })
  status: string; // ✅ REQUIRED for account control

  @OneToOne(() => EmployeeAddress, address => address.employee, {
  cascade: true,
  })
   @JoinColumn()
  address: EmployeeAddress;

  @OneToOne(() => EmployeeBankDetails, bank => bank.employee, {
  cascade: true,
  })
@JoinColumn()
bankDetails: EmployeeBankDetails;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
