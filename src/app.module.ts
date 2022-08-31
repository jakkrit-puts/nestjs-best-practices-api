import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
