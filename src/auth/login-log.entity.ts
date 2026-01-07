import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('login_logs')
export class LoginLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mailID: string;

  @Column()
  status: string; // SUCCESS | FAILED

  @CreateDateColumn()
  createdAt: Date;
}
