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
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  // ================= SIGN UP =================
  async signup(body: any) {
    const userExists = await this.userRepo.findOne({
      where: { mailID: body.mailID },
    });

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

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
      throw new BadRequestException('Email already exists');
    }

    return { message: 'User registered successfully' };
  }

  // ================= SIGN IN =================
  async signin(body: any) {
    const user = await this.userRepo.findOne({
      where: { mailID: body.mailID },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 1. If lock expired → unlock account
    if (user.lockUntil && user.lockUntil <= new Date()) {
      user.failedLoginAttempts = 0;
      user.lockUntil = null;

      await this.userRepo.save(user);

      // Send account activated mail
      await this.mailService.sendAccountActivatedMail(
        user.mailID,
        user.name,
      );
    }

    // 2. If still locked
    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new UnauthorizedException(
        'Account is locked. Please try again after some time.',
      );
    }

    // 3. Compare password
    const isPasswordValid = await bcrypt.compare(
      body.password,
      user.password,
    );

    // 4. Wrong password
    if (!isPasswordValid) {
      user.failedLoginAttempts += 1;

      // Lock after 5 attempts
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

        await this.mailService.sendAccountLockedMail(
          user.mailID,
          user.name,
        );
      }

      await this.userRepo.save(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    // 5. Successful login → reset counters
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await this.userRepo.save(user);

    // 6. Generate token
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
