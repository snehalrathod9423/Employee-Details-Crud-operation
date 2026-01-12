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
        failedLoginAttempts: 0,
        lockUntil: null,
      });
    } catch (error) {
      throw new BadRequestException('Unable to create user');
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

    // 🔓 Unlock account if lock expired
    if (user.lockUntil && user.lockUntil <= new Date()) {
      user.failedLoginAttempts = 0;
      user.lockUntil = null;
      await this.userRepo.save(user);

      await this.mailService.sendAccountActivatedMail(
        user.mailID,
        user.name,
      );

      console.log('Account activated:', user.mailID);
    }

    // 🔒 Block login if account is locked
    if (user.lockUntil && user.lockUntil > new Date()) {
      console.log('Login blocked, account locked:', user.mailID);
      throw new UnauthorizedException(
        'Account is locked. Please try again later.',
      );
    }

    // 🔑 Password check
    const isPasswordValid = await bcrypt.compare(
      body.password,
      user.password,
    );

    // ❌ Wrong password
    if (!isPasswordValid) {
      user.failedLoginAttempts =
        (user.failedLoginAttempts || 0) + 1;

      console.log(
        `Failed attempt ${user.failedLoginAttempts} for ${user.mailID}`,
      );

      // 🔒 Lock on 5th attempt
      if (user.failedLoginAttempts === 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);

        await this.userRepo.save(user);

        await this.mailService.sendAccountLockedMail(
          user.mailID,
          user.name,
        );

        console.log('Account locked & email sent:', user.mailID);
      } else {
        await this.userRepo.save(user);
      }

      throw new UnauthorizedException('Invalid credentials');
    }

    // ✅ Successful login
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await this.userRepo.save(user);

    console.log('Login successful:', user.mailID);

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
