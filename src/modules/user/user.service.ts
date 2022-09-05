import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';
import { hashPassword } from '../../utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto) {
    const { username, password } = signupDto;

    const userExists = await this.findOneUser(username);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashPass = await hashPassword(password);

    const user = this.userRepository.create({
      username,
      password: hashPass,
    });

    await this.userRepository.save(user);

    return { message: 'User successfully created !' };
  }

  async findOneUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
