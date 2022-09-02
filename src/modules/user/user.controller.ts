import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup') // POST /user/signup
  signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me') // GET /user/me
  Profile(@Request() req) {
    return req.user;
  }
}
