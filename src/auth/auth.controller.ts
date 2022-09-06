import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AUTH_SUCCESS } from 'src/shared/message';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  async signin(@Request() req) {
    return {
      data: await this.authService.signin(req.user),
      message: AUTH_SUCCESS,
    };
  }
}
