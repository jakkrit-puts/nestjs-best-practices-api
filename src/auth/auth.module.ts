import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.strategy';
import * as config from 'config';
import { JwtStrategy } from './jwt/jwt.strategy';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret_key,
      signOptions: { expiresIn: jwtConfig.expires_in },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
