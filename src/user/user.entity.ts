import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  mailID: string;

  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column()
  role: string; // Admin | Manager | Employee

  @Column()
  status: string;
}
