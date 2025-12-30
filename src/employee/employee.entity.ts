import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { EmployeeAddress } from './employee-address.entity';
import { EmployeeBankDetails } from './employee-bankdetails.entity';


@Entity()
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

  @OneToOne(() => EmployeeAddress, address => address.employee, {
    cascade: true,
  })
  address: EmployeeAddress;

  @OneToOne(() => EmployeeBankDetails, bank => bank.employee, {
    cascade: true,
  })
  bankDetails: EmployeeBankDetails;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
