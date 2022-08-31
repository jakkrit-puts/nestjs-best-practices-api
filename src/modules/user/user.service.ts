import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto) {
    try {
      const { username, password } = signupDto;

      const hashPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        username,
        password: hashPassword,
      });

      await this.userRepository.save(user);

      return { message: 'User successfully created !' };
    } catch (error) {
      throw new ConflictException({
        message: 'Username already exist !.',
        status_code: 100,
      });
    }
  }

  async findOneUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
