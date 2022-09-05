import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { comparePassword } from '../utils/password';

const jwtConfig = config.get('jwt');
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneUser(username);
    if (user && (await comparePassword(pass, user.password)) === true) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: any) {
    const payload = { username: user.username, sub: user.id };

    const token = this.jwtService.sign(payload);
    const decode = this.jwtService.verify(token, jwtConfig.secret_key);
    const typeToken = jwtConfig.type;

    return {
      access_token: token,
      expires_in: decode.exp,
      type: typeToken,
    };
  }
}
