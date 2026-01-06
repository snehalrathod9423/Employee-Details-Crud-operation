import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { signupSchema } from '../common/validations/signup.schema';
import { signinSchema } from '../common/validations/signin.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body) {
    const { error } = signupSchema.validate(body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return this.authService.signup(body);
  }

  @Post('signin')
  signin(@Body() body) {
    const { error } = signinSchema.validate(body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return this.authService.signin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@Req() req) {
    return {
      name: req.user.name,
      mailID: req.user.mailID,
    };
  }
}
