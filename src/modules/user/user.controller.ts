import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CREATE_DATA_SUCCESS, GET_DATA_SUCCESS } from 'src/shared/message';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup') // POST /user/signup
  async signup(@Body() signupDto: SignupDto) {
    return {
      data: await this.userService.signup(signupDto),
      message: CREATE_DATA_SUCCESS,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me') // GET /user/me
  Profile(@Request() req) {
    return { data: req.user, message: GET_DATA_SUCCESS };
  }
}
