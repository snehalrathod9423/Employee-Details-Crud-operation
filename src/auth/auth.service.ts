import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // ================= SIGN UP =================
  async signup(body: any) {
    // 1. Check if email already exists
    const userExists = await this.userRepo.findOne({
      where: { mailID: body.mailID },
    });

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // 3. Save user (wrapped in try-catch to avoid 500 error)
    try {
      await this.userRepo.save({
        name: body.name,
        mailID: body.mailID,
        password: hashedPassword,
        mobile: body.mobile,
        role: body.role,
        status: 'ACTIVE',
      });
    } catch (error) {
      // Handles DB unique constraint / unexpected DB errors
      throw new BadRequestException('Email already exists');
    }

    return { message: 'User registered successfully' };
  }

  // ================= SIGN IN =================
  async signin(body: any) {
    // 1. Find user by email
    const user = await this.userRepo.findOne({
      where: { mailID: body.mailID },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Generate JWT token
    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return {
      token,
      expiresIn: '5 minutes',
    };
  }
}
